import { Button, Card, Col, Row,Typography } from 'antd'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/A.png'
import { setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'
import { useEffect } from 'react'
import  { fetchCards }  from '../../store/features/details/detailsSlice'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'
import './profile.scss'
import { motion } from 'framer-motion'

import { ClockCircleOutlined } from '@ant-design/icons'


const { Title, Text, Paragraph  } = Typography

export const ProfilePage = () => {
  const { payload } = useSelector((state: RootState) => setCredentials(state))
  const user = payload.auth.userInfo
  

  const dispatch = useTypedDispatch()
  const { data, status, error } = useTypedSelector((state: RootState) => state.card)
  
  

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards())
    }
    if (status === 'loading') {
      return <p>Loading...</p>
    }

    if (status === 'failed') {
      return <p>{error}</p>
    }
  }, [status, dispatch])
  
  
  
  const dataCount = data.slice(3)
  
  
  // Get current data 
  const now = new Date()
  const time: string = now.toLocaleTimeString()
  
  
  

  return (
    <div className='profile'>
      <Row>
        <Col span={8}>
          <Card
            hoverable
            className='profile__card'
          >
            <img alt="example" src={avatar} style={{ width: 100, height: 100, borderRadius: 90, marginBottom: 5 }} />
            <Title level={4}>{user.first_name}</Title>

            <Text type="secondary">{user.location}</Text>
            <Text style={{ width: 275, display: 'block' ,marginTop: 20 }}>{user.about_user}</Text>
            
            <Row gutter={[20, 20]} style={{marginTop: 30}} className='links'>
              <Col span={24}>
                <NavLink to="/profile" >Мои объявления</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to="/edit-profile" >Редактирование</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to='/' >Новое объявление</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to='/' >Выход</NavLink>
              </Col>
            </Row>
          </Card>
        </Col>
        <div className='line'></div>
        <Col span={14}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {
            dataCount?.map((card) => (
              <Card
                key={card.id}
                hoverable
                style={{ width: 795, border: 'none' }}
                >
                  <Row>
                    <Col span={5}><img alt="example" src={card.img} style={{ width: 137, height: 140, borderRadius: 6 }} /></Col>
                    <Col span={19}>
                      <Text type="secondary" style={{ fontSize: 12 }}><ClockCircleOutlined /> {time}</Text>
                      <div style={{width: 600, display: 'flex', justifyContent: 'space-between', marginBottom: -13, marginTop: -3}}>
                        <Title level={4} style={{color: '#80DBA6'}}>{card.title}</Title>
                        <Button style={{color: '#333333', marginTop: 4, border: 'none'}}>Изменить</Button>
                      </div>
                      <Text strong style={{fontSize: 18 }}>{card.price} ₸</Text>
                      <Text style={{ fontSize: 12, color: '#BDBDBD', display: 'block',  marginBottom: 5}}>{card.ageGender}</Text>
                      <Paragraph style={{width: 550}}>{card.description}</Paragraph>
                    </Col>
                  </Row>
              </Card>
            ))
          }
        </motion.div>
        </Col>
      </Row>
    </div>
  )
}
