import { Button, Card, Col, Image, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ClockCircleOutlined, HeartTwoTone } from '@ant-design/icons'
import { API_URL } from '@api/index'
import { AnnouncementCardType } from '@typess/types'

import blike from '../../assets/like.png'
import dlike from '../././../assets/blike.png'

import './card-org.scss'
import './card.scss'

type CardType = {
  value: AnnouncementCardType
  type: 'profile' | 'main'
  removeFavorite: (slug: string) => void
}

const { Title, Text, Paragraph } = Typography
export const CardMain = ({ value, type, removeFavorite }: CardType) => {
  const [like, setLike] = useState<boolean>(false)
  const { created_at, location, user_name, photos } = value

  const handleLike = () => {
    setLike((item) => !item)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5,  }}
    >
      <Card
        className="CardAnnoun"
        hoverable
        style={{
          width: '100%',
          border: 'none',
          // height: 235,
          padding: 0,
          background: '#ffffff',
        }}
      >
        <Row gutter={30} className="CardAnnoun-wrapper">
          <Col className="CardAnnoun-wrapper_image">
            <Image
              className="CardAnnoun_img"
              alt="example"
              src={photos[0] ? photos[0].image_url : '/dog.png'}
              // style={{ width: 215, height: 195, borderRadius: 6 }}
            />
          </Col>
          <Col className="CardAnnoun-wrapper_content">
            <Text type="secondary" style={{ fontSize: 12 }}>
              <ClockCircleOutlined /> {moment(created_at).format('MM.DD.YYYY')}
            </Text>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: -13,
                marginTop: -3,
              }}
            >
              <Link to={`/announcement/${value.slug}`} key={value.slug}>
                <Title
                  className="title-s"
                  level={4}
                  style={{ fontSize: 18, color: '#FFD02b', fontWeight: '700' }}
                >
                  {value.title}
                </Title>
              </Link>
            </div>
            <Text strong style={{ fontSize: 18 }}>
              {value.price == '-1.00' ? 'Договорная' : `${value.price} KGS`}
            </Text>
            <Paragraph
              className="paragraph"
              style={{ width: '100%', fontSize: '16px', height: '60px' }}
            >
              {value.description}
            </Paragraph>
            <Row justify={'space-between'}>
              <div style={{ display: 'flex', gap: '7px' }}>
                <Image
                  className="card_user-photo"
                  src={`${value.user_photo ? value.user_photo : '/dogg.jpg'}`}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography.Title
                    style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}
                  >
                    {user_name}
                  </Typography.Title>
                  <Typography.Text
                    style={{ color: '#828282', margin: 0, fontSize: '12px' }}
                  >
                    <img src="/Location.svg" height={'12px'} width={'10px'} alt="" />{' '}
                    {location}
                  </Typography.Text>
                </div>
              </div>

              {type == 'profile' && (
                <Button
                  onClick={() => {
                    if (value.slug) {
                      removeFavorite(value.slug)
                    }
                  }}
                  style={{
                    color: '#333333',
                    marginTop: 4,
                    border: 'none',
                    fontSize: 12,
                  }}
                >
                  Удалить
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </motion.div>
  )
}
