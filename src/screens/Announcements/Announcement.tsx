import { Button, Carousel, Col, Divider, Image, Layout, Row, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { AxiosError, AxiosResponse } from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedSelector } from 'src/hooks'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '@api/index'
import { favorites, likeAnnoun } from '@store/favorites/favoriteId'
import { errorHandler } from '@utils/errorHandler'

import dlike from '../../assets/blike.png'
import blike from '../../assets/like.png'
import no_foto from '../../assets/no_photo.jpg'
import { FavoritesType, PostAnnouncementTypes } from '../../types/types'

import './announcement.scss'

const { Title, Text, Paragraph } = Typography

export const Announcements: React.FC = () => {
  const navigate = useNavigate()
  const [like, setLike] = useState<boolean>(false)
  const { userInfo } = useTypedSelector((state) => state.auth)
  const [announ, setAnnoun] = useState<PostAnnouncementTypes>()
  const { id } = useParams()
  const carouselRef = useRef<CarouselRef>(null)
  const [announcement, setAnnouncement] = useState<FavoritesType[]>([])

  const handleLike = () => {
    setLike((like) => !like)
    likeAnnoun(announ?.slug)
  }

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const res = await api.get<PostAnnouncementTypes>(`/announcements/${id}/`)
        if (userInfo && userInfo.email) {
          const favo = await favorites()
          if (favo) {
            const findLike =
              favo && favo.find((item) => item.announcement == res?.data.slug)
            setLike(!!findLike)
            setAnnouncement(favo)
          }
        }
        setAnnoun(res.data)
      } catch (error: AxiosError | any) {
        errorHandler(error)
      }
    })()
  }, [id])

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
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
    <motion.div
      className="announcements"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="title">
        <Title style={{ marginBottom: 0 }} level={2}>
          {announ?.title}
        </Title>
        <Col style={{ display: userInfo?.email ? 'flex' : 'none' }}>
          {userInfo?.date_joined ? (
            like ? (
              <img src={blike} onClick={handleLike} alt="like" />
            ) : (
              <img src={dlike} onClick={handleLike} />
            )
          ) : (
            ''
          )}
          {userInfo?.id === announ?.user ? (
            <Link to={`/edit-announcement/${announ?.slug}`}>Редактировать</Link>
          ) : null}
        </Col>
      </Row>
      <div className="main">
        <div className="main__img">
          <Row>
            <Row className="big-image">
              <Col style={{ textAlign: 'center' }}>
                {announ?.photos && announ.photos.length > 0 ? (
                  <Carousel ref={carouselRef}>
                    {announ?.photos &&
                      announ?.photos.map((photo) => (
                        // <div key={photo.id}>
                        <Image
                          key={photo.id}
                          className="image-corusel"
                          src={photo.image_url}
                        />
                        // </div>
                      ))}
                  </Carousel>
                ) : (
                  <Carousel ref={carouselRef}>
                    {[1, 2, 3].map((photo, index) => (
                      <Image
                        className="image-corusel"
                        preview={false}
                        src={no_foto}
                        key={index}
                      />
                    ))}
                  </Carousel>
                )}
                <LeftOutlined onClick={handlePrev} />
                <RightOutlined onClick={handleNext} />
              </Col>
            </Row>
            <Row className="slides__img">
              <div className="slides_width">
                {announ?.photos &&
                  announ?.photos.map((photo, index) => {
                    return (
                      <Image
                        className="image-corusel"
                        onClick={() => clickGoTo(index)}
                        preview={false}
                        key={index}
                        src={photo.image_url}
                      />
                    )
                  })}
              </div>
            </Row>
          </Row>
          <div className="description">
            <Row>
              <Col span={6}>
                <Text className="gray-text">Местоположение</Text>
              </Col>
              <Col span={12} className="middle-text">
                <Paragraph>{announ?.location}</Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Text className="gray-text">Описание</Text>
              </Col>
              <Col span={12}>
                <Paragraph className="middle-text">{announ?.description}</Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Text className="gray-text">Категория</Text>
              </Col>
              <Col span={12}>
                <Paragraph className="middle-text">{announ?.category}</Paragraph>
              </Col>
            </Row>
          </div>
        </div>
        <div className="sider">
          <Text>{announ === null ? 'бесплатно ДЭЭ' : `${announ?.price} KGS`}</Text>
          <Row className="sider-i">
            <Image
              preview={false}
              src={announ?.user_photo ? announ?.user_photo : '/user-1.png'}
            />
            <Text>{announ?.user_name}</Text>
          </Row>
          <Row className="phone">
            <Text>Номер телефона</Text>
            <Text>{announ?.phone_number}</Text>
          </Row>
          {userInfo?.id !== announ?.user ? (
            <Button
              onClick={() => {
                if (userInfo?.email) {
                  console.log(userInfo)
                  navigate('/chats', {
                    state: {
                      anoun: announ?.slug,
                      id: userInfo.id,
                      photo: announ?.user_photo,
                      name: announ?.user_name,
                    },
                  })
                } else {
                  toast.warning('авторизуйтесь')
                }
              }}
            >
              Связаться
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
// linear-gradient(262.43deg, #ffd02b -2.86%, #96e7b7 81.84%)