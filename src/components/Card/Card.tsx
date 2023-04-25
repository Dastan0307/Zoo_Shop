import { Button, Card, Col, Image, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { ClockCircleOutlined } from '@ant-design/icons'
import { AnnouncementCardType } from '@typess/types'

type CardType = {
  value: AnnouncementCardType
  type: 'profile' | 'main'
}

const { Title, Text, Paragraph } = Typography
const Cards = ({ value, type }: CardType) => {
  const {
    category,
    created_at,
    description,
    location,
    price,
    slug,
    title,
    updated_at,
    user,
    views_count,
    user_name,
    photos,
  } = value
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        hoverable
        style={{
          width: '100%',
          border: 'none',
          height: 235,
          padding: 0,
          background: '#ffffff',
        }}
      >
        <Row gutter={30} style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Col>
            <Image
              className="card-image"
              alt="example"
              src={photos[0].image_url}
              style={{ width: 215, height: 195, borderRadius: 6 }}
            />
          </Col>
          <Link to={`/announcement/${value.slug}`} key={value.slug}>
            <Col>
              <Text type="secondary" style={{ fontSize: 12 }}>
                <ClockCircleOutlined /> {moment(created_at).format('dddd')}
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
                <Title
                  className="title-s"
                  level={4}
                  style={{ fontSize: 18, color: '#96E7B7', fontWeight: '700' }}
                >
                  {value.title}
                </Title>
              </div>
              <Text strong style={{ fontSize: 18 }}>
                {value.price == '-1' ? 'Договорная' : `${value.price} KGS`}
              </Text>
              <Paragraph style={{ width: '100%', fontSize: '16px', height: '60px' }}>
                {value.description}
              </Paragraph>
              {type == 'main' ? (
                <div style={{ display: 'flex', gap: '7px' }}>
                  <Image src="/holand.png" />
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
              ) : (
                <Button
                  style={{
                    color: '#333333',
                    marginTop: 4,
                    border: 'none',
                    fontSize: 12,
                  }}
                >
                  Изменить
                </Button>
              )}
            </Col>
          </Link>
        </Row>
      </Card>
    </motion.div>
  )
}

export default Cards
