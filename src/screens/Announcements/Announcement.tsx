import { Button, Carousel, Col, Divider, Image, Row, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from 'src/hooks'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '@api/index'
import {
  useGetAnnouncementQuery,
  useGetAnnouncementsQuery,
} from '@store/announcements/getAnnoun'

import './announcement.scss'

import { toast } from 'react-toastify'

const { Sider } = Layout
const { Title, Text, Paragraph } = Typography

const pohotos: string[] = [
  'https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAAA1fB91VgHp3UJ3BLapwEbOedYJO2prDPrrcVf14tFAM6mjGPjIIjcUNbRuR2kkG7kE&usqp=CAU',
  'https://www.purina.co.uk/sites/default/files/2020-12/Dog_1098119012_Teaser.jpg',
  'https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU.jpg',
  'https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU.jpg',
]

export const Announcements: React.FC = () => {
  const navigate = useNavigate()
  const [isPhone, setIsPhone] = useState<boolean>(false)
  const [clikcPhoto, setClickPhoto] = useState(0)
  const { userInfo } = useTypedSelector((state) => state.auth)
  const { id } = useParams()

  const { data, isLoading, error } = useGetAnnouncementQuery(id)
  const photo = data?.photos

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const carouselRef = useRef<CarouselRef>(null)
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
  }

  console.log(data)

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next()
    }
  }

  const handlePhoto = (i: number) => {
    setClickPhoto(i)
  }

  return (
    <div className="announcements">
      <button></button>
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
                  {pohotos &&
                    pohotos.map((photo) => (
                      <Image
                        preview={false}
                        key={photo}
                        src={photo}
                        alt="carousel_photo"
                      />
                    ))}
                </Carousel>
                <LeftOutlined onClick={handlePrev} />
                <RightOutlined onClick={handleNext} />
              </Col>
            </Row>
            <Row className="slides__img">
              <Col>
                {
                  pohotos.map((poho, index) => {
                    return (
                      <Image onClick={() => handlePhoto(index)} preview={false} key={poho} src={poho}/>
                    )
                  })
                }
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
              <Col span={6}>
                <Text className="addressMap">Показать на карте</Text>
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
