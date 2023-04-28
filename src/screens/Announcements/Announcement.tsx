import { Button, Carousel, Col, Divider, Image, Layout, Row, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from 'src/hooks'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '@api/index'
import { useGetAnnouncementQuery } from '@store/announcements/getAnnoun'
import './announcement.scss'
import { toast } from 'react-toastify'
import { errorHandler } from '@utils/errorHandler'
import { current } from '@reduxjs/toolkit'
import { number } from 'yup'
const { Title, Text, Paragraph } = Typography
type PostAnnouncementTypes = {
  slug?: string
  user?: string
  photos?: [
    {
      id: number,
      announcement: string,
      image: string,
      image_url: string,
    }
  ]
  title: string
  price?: string
  description: string
  phone_number: string
  location: string
  created_at?: string
  updated_at?: string
  views_count?: number
  category: string
}

export const Announcements: React.FC = () => {
  const navigate = useNavigate()
  // const [data, setData] = useState<PostAnnouncementTypes>()
  const [index, setIndex] = useState<number>(0)
  const [isPhone, setIsPhone] = useState<boolean>(false)
  const { userInfo } = useTypedSelector((state) => state.auth)
  const { id } = useParams()
  const carouselRef = useRef<CarouselRef>(null)

  const { data } = useGetAnnouncementQuery(id)
  const photos = data && data?.photos

  const pohotos: string[] = [
    'https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU.jpg',
    'https://alpha.aeon.co/images/acd6897d-9849-4188-92c6-79dabcbcd518/header_essay-final-gettyimages-685469924.jpg',
    'https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg'
  ]

  console.log(data);

  async function getAnnoun(id: any) {
    try {
      const res = await api.get<PostAnnouncementTypes>(`announcements/${id}/`)
      // setData(res.data)
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  useEffect(() => {
    getAnnoun(id)
  }, [id])


  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
    console.log(carouselRef);

  }

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next()
    }
  }

  const clickGoTo = (current: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(current)
    }
  }

  return (
    <div className="announcements">
      <Row className="title">
        <Title level={2}>{data?.title}</Title>
        {userInfo?.id === data?.user ? (
          <Link to={`/edit-announcement/${data?.slug}`}>Редактировать</Link>
        ) : null}
      </Row>
      <div className="main">
        <div className="main__img">
          <Row>
            <Row className="big-image">
              <Col>
                {
                  photos && <Carousel ref={carouselRef}>
                    {photos && photos.map(photo => <Image className='image-corusel' width={713} preview={false} src={photo.image_url} key={photo.id} />)}
                  </Carousel>
                }
                <LeftOutlined onClick={handlePrev} />
                <RightOutlined onClick={handleNext} />
              </Col>
            </Row>
            <Row className="slides__img">
              <Col>
                {photos && photos.map((photo, index) => {
                  return (
                    <Image
                      className='image-corusel'
                      onClick={() => clickGoTo(index)}
                      preview={false}
                      key={index}
                      src={photo.image_url}
                    />
                  )
                })}
              </Col>
            </Row>
          </Row>
          <div className="description">
            <Row>
              <Col span={6}>
                <Text className="gray-text">Местоположение</Text>
              </Col>
              <Col span={12} className="middle-text">
                <Paragraph>{data?.location}</Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Text className="gray-text">Описание</Text>
              </Col>
              <Col span={12}>
                <Paragraph className="middle-text">{data?.description}</Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Text className="gray-text">Категория</Text>
              </Col>
              <Col span={12}>
                <Paragraph className="middle-text">{data?.category}</Paragraph>
              </Col>
            </Row>
          </div>
        </div>
        <div className="sider">
          <Text>{data === null ? 'бесплатно ДЭЭ' : `${data?.price} KGS`}</Text>
          <Row>
            <Image src="/gost.jpg" />
            <Text>{data?.user_name}</Text>
          </Row>
          <Row className="phone">
            <Text>Номер телефона</Text>
            <Text>{data?.phone_number}</Text>
          </Row>
          <Button
            onClick={() => {
              if (userInfo?.access) {
                console.log(userInfo)

                navigate('/chats', { state: { anoun: data?.slug, id: userInfo.id } })
              } else {
                toast.warning('авторизуйтесь')
              }
            }}
          >
            Связаться
          </Button>
        </div>
      </div>
    </div>
  )
}