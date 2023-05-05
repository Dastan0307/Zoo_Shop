import { Button, Card, Col, Image, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useLayoutEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, NavLink } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { ClockCircleOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { AuthApi } from '@api/AuthApi'
import EditProfile from '@screens/Edit/EditProfile'

import avatar from '../../assets/A.png'
import { logout, setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

import './profile.scss'
import './cardProfile.scss'

const { Title, Text, Paragraph } = Typography

export const ProfilePage = () => {
  const dispatch = useTypedDispatch()
  const { userInfo } = useTypedSelector((state: RootState) => state.auth)
  const [mobile, setMobile] = useState<boolean>(true)
  const [profileType, setProfileType] = useState<boolean>(false)
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

  const MobileQuery = useMediaQuery({ query: '(max-width:968px)' })

  return (
    <div className="profile">
      <Row>
        <Col xs={23} md={8} className="profile_card_wrapper">
          <Card className="profile__card">
            <Image
              alt="example"
              src={userInfo?.image ? userInfo?.image : '/dogg.jpg'}
              style={{ width: 100, height: 100, borderRadius: 90, marginBottom: 5 }}
            />
            <Title level={4}>
              {userInfo?.first_name} {userInfo?.last_name}
            </Title>

            <Text>{userInfo?.about_user ? userInfo?.about_user : 'Нету описание'}</Text>
            <Row className="close_btn profile_close " onClick={() => setMobile(!mobile)}>
              {mobile ? (
                <CloseOutlined style={{ fontSize: 20 }} />
              ) : (
                <MenuOutlined style={{ fontSize: 20 }} />
              )}
            </Row>
            <Row
              gutter={[20, 20]}
              style={{ marginTop: 30, left: mobile ? '0%' : '-100%' }}
              className="links"
            >
              <Col span={24}>
                <Typography.Text
                  style={{ color: !profileType ? '#FFD02b' : '#333333' }}
                  onClick={() => {
                    setProfileType(false)
                    setMobile(false)
                  }}
                >
                  Мои объявления
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text
                  style={{ color: !profileType ? '#333333' : '#FFD02b' }}
                  onClick={() => {
                    setProfileType(true)
                    setMobile(false)
                  }}
                >
                  Редактирование
                </Typography.Text>
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
        {MobileQuery ? '' : <div className="profile__line"></div>}
        {!profileType ? (
          <Col xs={24} md={14} className="profile__card_main">
            {userInfo?.users_announsments.length ? (
              userInfo?.users_announsments?.map((card) => (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className="CardProfile"
                    hoverable
                    style={{
                      width: '100%',
                      border: 'none',
                      // height: 235,
                      padding: 0,
                      background: '#ffffff',
                    }}
                  >
                    <Row gutter={30} className="CardProfile-wrapper">
                      <Col className="CardProfile-wrapper_image">
                        <Image
                          className="CardProfile_img"
                          alt="example"
                          src={card?.photos[0] ? card.photos[0].image_url : '/dogg.jpg'}
                          // style={{ width: 215, height: 195, borderRadius: 6 }}
                        />
                      </Col>
                      <Col className="CardProfile-wrapper_content">
                        <Link to={`/announcement/${card.slug}`} key={card.slug}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <ClockCircleOutlined />{' '}
                            {moment(card.created_at).format('dddd')}
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
                              style={{
                                fontSize: 18,
                                color: '#FFD02b',
                                fontWeight: '700',
                              }}
                            >
                              {card.title}
                            </Title>
                          </div>
                          <Text strong style={{ fontSize: 18 }}>
                            {card.price == '-1.00' ? 'Договорная' : `${card.price} KGS`}
                          </Text>
                          <Paragraph
                            className="paragraph"
                            style={{ width: '100%', fontSize: '16px', height: '60px' }}
                          >
                            {card.description}
                          </Paragraph>
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Typography.Title
                level={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image preview={false} src="/noData.png.png" width={100} /> пока нет ваших
                обьявлений(
              </Typography.Title>
            )}
          </Col>
        ) : (
          <EditProfile />
        )}
      </Row>
    </div>
  )
}
