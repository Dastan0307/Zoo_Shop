import { Button, Card, Col, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import { useLayoutEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { ClockCircleOutlined } from '@ant-design/icons'
import { AuthApi } from '@api/AuthApi'

import avatar from '../../assets/A.png'
import { logout, setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

import './profile.scss'

const { Title, Text, Paragraph } = Typography

export const ProfilePage = () => {
  const dispatch = useTypedDispatch()
  const { userInfo } = useTypedSelector((state: RootState) => state.auth)

  useLayoutEffect(() => {
    const getCurrentUser = async () => {
      if (userInfo) {
        const data = await AuthApi.getCurrentUser(userInfo.id)
        if (data?.status == 200) {
          dispatch(setCredentials(data?.data))
        }
      }
    }
    getCurrentUser()
  }, [])

  return (
    <div className="profile">
      <Row>
        <Col span={8}>
          <Card hoverable className="profile__card">
            <img
              alt="example"
              src={avatar}
              style={{ width: 100, height: 100, borderRadius: 90, marginBottom: 5 }}
            />
            <Title level={4}>
              {userInfo?.first_name}. {userInfo?.last_name}
            </Title>

            {/* <Text type="secondary">{userInfo?.location}</Text> */}
            <Text style={{ width: 275, display: 'block', marginTop: 20 }}>
              {userInfo?.about_user}
            </Text>

            <Row gutter={[20, 20]} style={{ marginTop: 30 }} className="links">
              <Col span={24}>
                <NavLink to="/profile">Мои объявления</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to="/edit-profile">Редактирование</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to="/new-announcement">Новое объявление</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to="/" onClick={() => dispatch(logout())}>
                  Выход
                </NavLink>
              </Col>
            </Row>
          </Card>
        </Col>
        <div className="profile__line"></div>
        <Col span={14} className="profile__card_main">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {userInfo?.users_announsments?.map((card) => (
              <Card key={card.slug} hoverable style={{ width: 795, border: 'none' }}>
                <Row>
                  <Col span={5}>
                    <img
                      alt="example"
                      src={card.photos ? card.photos[0].image_url : '/public/dogs.png'}
                      style={{ width: 137, height: 140, borderRadius: 6 }}
                    />
                  </Col>
                  <Col span={19}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> null
                    </Text>
                    <div
                      style={{
                        width: 600,
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: -13,
                        marginTop: -3,
                      }}
                    >
                      <Title level={4} style={{ color: '#80DBA6' }}>
                        {card.title}
                      </Title>
                      <Link to={'/edit-announcement/' + card.slug}>
                        <Button
                          style={{ color: '#333333', marginTop: 4, border: 'none' }}
                        >
                          Изменить
                        </Button>
                      </Link>
                    </div>
                    <Text strong style={{ fontSize: 18 }}>
                      {card.price} ₸
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#BDBDBD',
                        display: 'block',
                        marginBottom: 5,
                      }}
                    >
                      {card.created_at}
                    </Text>
                    <Paragraph style={{ width: 550 }}>{card.description}</Paragraph>
                  </Col>
                </Row>
              </Card>
            ))}
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}
