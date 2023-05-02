import { Button, Card, Col, Image, Row, Typography } from 'antd'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useLayoutEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { ClockCircleOutlined } from '@ant-design/icons'
import { AuthApi } from '@api/AuthApi'

import avatar from '../../assets/A.png'
import { logout, setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

import './profile.scss'
import './cardProfile.scss'
import { useMediaQuery } from 'react-responsive'

const { Title, Text, Paragraph } = Typography

export const ProfilePage = () => {
  const dispatch = useTypedDispatch()
  const { userInfo } = useTypedSelector((state: RootState) => state.auth)
  console.log(userInfo?.users_announsments)

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

  const MobileQuery = useMediaQuery({ query: '(max-width:800px)' })


  return (
    <div className="profile">
      <Row>
        <Col xs={24} md={8} className='profile_card_wrapper' >
          <Card hoverable className="profile__card">
            <Image
              alt="example"
              src={userInfo ? userInfo?.image : ''}
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
      {MobileQuery ? '' :  <div className="profile__line"></div> } 
        <Col span={14} className="profile__card_main">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {userInfo?.users_announsments?.map((card) => (
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
                        src={card?.photos ? card.photos[0].image_url : '/dog.png'}
                        // style={{ width: 215, height: 195, borderRadius: 6 }}
                      />
                    </Col>
                    <Col className="CardProfile-wrapper_content">
                      <Link to={`/announcement/${card.slug}`} key={card.slug}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <ClockCircleOutlined /> {moment(card.created_at).format('dddd')}
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
                            style={{ fontSize: 18, color: '#FFD02B', fontWeight: '700' }}
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
            ))}
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}
