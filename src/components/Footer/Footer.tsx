import { Button, Col, Input, Modal, Row, Typography } from 'antd'
import { Footer as FooterWrapper } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './footer.scss'

import Title from 'antd/es/skeleton/Title'

import { PrimaryButton } from '..'
import { FeedBack } from '@api/feedbackApi'
import { toast } from 'react-toastify'

const { Text } = Typography

const style: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: 14,
  color: '#828282',
  marginLeft: 10,
}

export const Footer = () => {
  const navigate = useNavigate()
  const [feedbackValue, setFeedbackValue] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk =  async () => {
    const data = await FeedBack.send(feedbackValue)
    console.log(data);
    
    if(data?.status == 201){
      toast.success('Ваше сообщение отправлено')
      setFeedbackValue('')
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <FooterWrapper className="footer">
      <Row gutter={[20, 30]} className="footer_container">
        <Col className="gutter-row" span={7}>
          <div className="footer__link-div">
            <Text
              style={{
                color: '#333333',
                fontSize: 24,
                fontWeight: 700,
                marginLeft: 10,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              Zoo.Net
            </Text>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className="footer__title">О нас</Text>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className="footer__title">Объявления</Text>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className="footer__title">Обратная связь</Text>
        </Col>
        <Col className="gutter-row" span={7}>
          <div className="footer__link-div">
            <Link to="#" style={style}>
              Copyright ©️ 2023 ZooNet. All Right Reserved.
            </Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/about-us" className="footer__link">
            Наша миссия
          </Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/announcement" className="footer__link">
            Объявления
          </Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to={'#'} onClick={() => setIsModalOpen(true)} className="footer__link">
            Оставить отзыв
          </Link>
        </Col>
        <Col className="gutter-row" span={7}>
          <div className="footer__link-div">
            <Link to="#" style={style}>
              Privacy Policy
            </Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" className="footer__link">
            Отзывы
          </Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/new-announcement" className="footer__link footer__link_long-word">
            Новое объявление
          </Link>
        </Col>
        <Col className="gutter-row" span={4}>
          <Link to="#" className="footer__link">
            Почта
          </Link>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="footer__link-div">
            <Link to="/about-us" className="footer__link-div">
              Terms of use
            </Link>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <Link to="/papers" className="footer__link_mg">
            Статьи о животных
          </Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/login" className="footer__link">
            Войти
          </Link>
        </Col>
      </Row>
      <div className="footer_mobil">
        <div className="footer__mb_list">
          <div className="list list_1">
            <Text
              style={{
                color: '#333333',
                fontSize: 24,
                fontWeight: 700,
                marginLeft: 10,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              Zoo.Net
            </Text>
            {/* <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/announcement/:id" element={<Announcements />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />
          <Route path="/edit-announcement/:announcement" element={<EditAnnouncement />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/papers/:id" element={<Paper />} />
          <Route path="/papers/:id" element={<AboutUs />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route element={<Layout footer={false} />}>
          <Route path="/chats" element={<Chat />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/recovery_finish" element={<RecoveryFinish />} />
        <Route path="/footer" element={<Footer />} /> */}
            <Link to={'#'}>Copyright ©️ 2023 ZooNet. All Right Reserved,</Link>
            <Link to={'/about-us'}>Privacy Policy</Link>
            <Link to={'/about-us'}>Terms of use</Link>
          </div>
          <div className="list">
            <Text>О нас</Text>
            <Link to={'/a'}>Наша миссия</Link>
            <Link to={'#'}>Отзывы</Link>
            <Link to={'/papers'}>Статьи о животных</Link>
          </div>
          <div className="list">
            <Text>Объявления</Text>
            <Link to={'/'}>Объявления</Link>
            <Link to={'/new-announcement'}>Новое объявление</Link>
            <Link to={'/login'}>Войти</Link>
          </div>
          <div className="list">
            <Text>Обратная связь</Text>
            <Text onClick={() => setIsModalOpen(true)}>Оставить отзыв</Text>
            <Link to={'#'}>Почта</Link>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        cancelButtonProps={{ hidden: true }}
        closable={false}
        okButtonProps={{ hidden: true }}
        style={{ maxWidth: '336px' }}
      >
        <Typography.Title
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#333333',
            textAlign: 'center',
          }}
        >
          Обратная связь
        </Typography.Title>
        <Typography.Paragraph
          style={{ fontSize: '16px', color: '#828282', margin: '30px 0 12px 0' }}
        >
          Оставьте ваш отзыв
        </Typography.Paragraph>
        <Input.TextArea
          value={feedbackValue}
          onChange={(e) => setFeedbackValue(e.target.value)}
          style={{
            minHeight: '180px',
            fontSize: '14px',
            color: '#333333',
            fontWeight: '300',
          }}
        ></Input.TextArea>
        <PrimaryButton
          onClick={handleOk}
          style={{ width: '100%', height: '40px', marginTop: '40px' }}
          type="primary"
        >
          Отправить
        </PrimaryButton>
        <Typography.Paragraph
          onClick={handleCancel}
          style={{
            textAlign: 'center',
            marginTop: '12px',
            marginBottom: 0,
            cursor: 'pointer',
          }}
        >
          Отменить
        </Typography.Paragraph>
      </Modal>
    </FooterWrapper>
  )
}
