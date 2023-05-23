import { Col, Divider, Image, Rate, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import { InstagramOutlined } from '@ant-design/icons'
import { OrganizarionType } from '@typess/types'

import './org-page.scss'
// adress
// adress_type
// description
// id
// image
// location
// phone_number
// rating
// schedule
// social_media
// title
// user
// verified_adress
// web_site

const category = {
  clinic: 'Ветеринарные клиники',
  zooshop: 'Зоомагазины',
  hostel: 'Хостелы/приюты',
  babysitter: 'Зооняни',
}
export const OrgPage = () => {
  const params = useLocation()
  const org: OrganizarionType = params.state

  return (
    <motion.div
      className="announcements"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="title">
        <Typography.Title style={{ marginBottom: 0 }} level={2}>
          {org.title}
        </Typography.Title>
      </Row>
      <Row align={'middle'}>
        <Typography.Text
            className='rating'
          style={{ fontSize: 16, color: '#828282' }}
        >
          Рейтинг:
        </Typography.Text>{' '}
        <Rate value={org.rating} />
      </Row>
      <div className="main">
        <div className="main__img">
          <Row>
            <Row className="big-image">
                <Image className="image-corusel" src={org.image} />
            </Row>
          </Row>
          <div className="description">
            <Row>
              <Col span={6}>
                <Typography.Text className="gray-text">Местоположение</Typography.Text>
              </Col>
              <Col span={12} className="middle-text">
                <Typography.Paragraph>{org.location}</Typography.Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Typography.Text className="gray-text">Описание</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Paragraph className="middle-text">
                  {org.description ? org.description : 'Не указано'}
                </Typography.Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>
                <Typography.Text className="gray-text">Категория</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Paragraph className="middle-text">
                  {category[`${org.adress_type}`]}
                </Typography.Paragraph>
              </Col>
            </Row>
          </div>
        </div>
        <div className="sider">
          <Row className='center-inst' >
            <Typography.Link
              href={
                org.social_media.includes('@')
                  ? `https://www.instagram.com/` + org.social_media.slice(1)
                  : `https://www.instagram.com/` + org.social_media
              }
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <InstagramOutlined style={{ fontSize: 36, color: '#FFD02b' }} />
              <Typography.Text style={{ fontSize: 12 }}>
                {org.social_media ? org.social_media : 'Не указано'}
              </Typography.Text>
            </Typography.Link>
          </Row>
          <Row className="phone">
            <Typography.Text>Номер телефона</Typography.Text>
            <Typography.Link href={`tel:${org.phone_number}`}>
              {org.phone_number}
            </Typography.Link>
          </Row>
          <Row className="phone">
            <Typography.Text>Время Работы</Typography.Text>
            <Typography.Text>
              {org.schedule ? org.schedule : 'Не указано'}
            </Typography.Text>
          </Row>
          <Row className="phone">
            <Typography.Text>Адресс</Typography.Text>
            <Typography.Link style={{alignItems: 'center' , display: 'flex'}} href={`https://2gis.kg/search/${org.adress}`}>
              {org.adress ? org.adress : 'Не указано'}
            </Typography.Link>
          </Row>
        </div>
      </div>
    </motion.div>
  )
}
