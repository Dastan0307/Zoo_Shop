import { Button, Carousel, Col, Divider, Image, Layout, Row, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from 'src/hooks'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '@api/index'
import { toast } from 'react-toastify'
import { errorHandler } from '@utils/errorHandler'
import { PostAnnouncementTypes } from '../../types/types'
import no_foto from '../../assets/no_photo.jpg'
import { motion } from 'framer-motion'
import dlike from '../../assets/blike.png'
import blike from '../../assets/like.png'
import './announcement.scss'
import { likeAnnoun } from '@store/favorites/favoriteId'



const { Title, Text, Paragraph } = Typography

export const Announcements: React.FC = () => {
  const navigate = useNavigate()
  const [like,setLike] = useState<boolean>(false)
  const { userInfo } = useTypedSelector((state) => state.auth)
  const [announ, setAnnoun ] = useState<PostAnnouncementTypes>()
  const { id } = useParams()
  const carouselRef = useRef<CarouselRef>(null)
  

  const handleLike = () => {
    setLike(item => !item)
    likeAnnoun(announ?.slug)
  }
  
  useLayoutEffect(() => {
    (async () =>  {
      try {
        const res = await api.get<PostAnnouncementTypes>(`/announcements/${id}/`)
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
    <motion.div
      className="announcements"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="title">
        <Title level={2}>{announ?.title}</Title>
        <Col>
          {userInfo?.id === announ?.user ? (like ? <img onClick={handleLike} src={blike}/> : <img onClick={handleLike} src={dlike}/>) : null}
          {userInfo?.id === announ?.user ? (
            <Link to={`/edit-announcement/${announ?.slug}`}>Редактировать</Link>
          ) : null}
        </Col>
      </Row>
      <div className="main">
        <div className="main__img">
          <Row>
            <Row className="big-image">
              <Col>
                {
                  announ?.photos &&  announ.photos.length > 0 ? <Carousel ref={carouselRef}>
                  {announ?.photos && announ?.photos.map(photo => <Image className='image-corusel' width={713} preview={false} src={photo.image_url} key={photo.id} />)}
                </Carousel> :
                  <Carousel ref={carouselRef}>
                    {[1,2,3].map((photo, index) => <Image className='image-corusel' width={713} preview={false} src={no_foto} key={index} />)}
                  </Carousel>
                }
                <LeftOutlined onClick={handlePrev} />
                <RightOutlined onClick={handleNext} />
              </Col>
            </Row>
            <Row className="slides__img">
              <Col>
                {announ?.photos && announ?.photos.map((photo, index) => {
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
          <Row>
            <Image src="/gost.jpg" />
            <Text>{announ?.user_name}</Text>
          </Row>
          <Row className="phone">
            <Text>Номер телефона</Text>
            <Text>{announ?.phone_number}</Text>
          </Row>
          <Button
            onClick={() => {
              if (userInfo?.access) {
                console.log(userInfo)

                navigate('/chats', { state: { anoun: announ?.slug, id: userInfo.id } })
              } else {
                toast.warning('авторизуйтесь')
              }
            }}
          >
            Связаться
          </Button>
        </div>
      </div>
    </motion.div>
  )
}