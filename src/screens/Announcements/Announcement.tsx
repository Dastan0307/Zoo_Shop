import { Button, Carousel, Col, Divider, Image, Layout, Row, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedSelector } from 'src/hooks'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '@api/index'
import { errorHandler } from '@utils/errorHandler'

// import { useGetAnnouncementQuery } from '@store/announcements/getAnnoun'
import './announcement.scss'

const { Sider } = Layout

const { Title, Text, Paragraph } = Typography
type PostAnnouncementTypes = {
  slug?: string
  user?: string
  photos?: { id: string; announcement: string; image: string; image_url: string }[]
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
  const [data, setData] = useState<PostAnnouncementTypes>()
  const [isPhone, setIsPhone] = useState<boolean>(false)
  const { userInfo } = useTypedSelector((state) => state.auth)
  const { id } = useParams()
  console.log(id)

  // const { data, isLoading, error } = useGetAnnouncementQuery(id)
  const photo = data?.photos
  async function getAnnoun(id: any) {
    try {
      const res = await api.get<PostAnnouncementTypes>(`announcements/${id}/`)
      setData(res.data)
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  useEffect(() => {
    getAnnoun(id)
  }, [id])

  const carouselRef = useRef<CarouselRef>(null)
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
    console.log(carouselRef)
  }

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next()
    }
  }

  return (
    <div className="announcements">
      <Row className="title">
        <Title level={2}>{data?.title}</Title>
        {userInfo?.id == data?.user ? (
          <Link to={`/edit-announcement/${data?.slug}`}>Редактировать</Link>
        ) : null}
      </Row>
      <div className="main">
        <div className="main__img">
          <Row className="big-image">
            <Row>
              <Col>
                <Carousel ref={carouselRef}>
                  {photo &&
                    photo.map((photo) => {
                      return (
                        <Image
                          // onClick={() => handlePhoto(photo.id)}
                          preview={false}
                          key={photo.id}
                          src={photo.image_url}
                        />
                      )
                    })}
                </Carousel>
                <LeftOutlined onClick={handlePrev} />
                <RightOutlined onClick={handleNext} />
              </Col>
            </Row>
            <Row className="slides__img">
              <Col>
                {photo &&
                  photo.map((photo) => {
                    return (
                      <Image
                        // onClick={() => handlePhoto(photo.id)}
                        preview={false}
                        key={photo.id}
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
            <Image src="https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png" />
            <Text>Владимир. Б</Text>
          </Row>
          {isPhone && (
            <Row className="phone">
              <Text>Номер телефона</Text>
              <Text>{data?.phone_number}</Text>
            </Row>
          )}
          <Button
            onClick={() => {
              if (userInfo?.access) {
                console.log(userInfo)

                navigate('/chats', { state: { anoun: data?.slug, id: userInfo.id } })
              } else {
                toast.warning('Aвторизуйтесь')
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
