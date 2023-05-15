import { Button, Col, Input, List, Modal, Row, Typography } from 'antd'
import { Footer as FooterWrapper } from 'antd/es/layout/layout'
import Title from 'antd/es/skeleton/Title'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FeedBack } from '@api/feedbackApi'

import { PrimaryButton } from '..'

import './footer.scss'

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
  const handleOk = async () => {
    const data = await FeedBack.send(feedbackValue)
    if (data?.status == 201) {
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
      <Row justify={'space-between'}>
        <Col>
          <List className='footer_list' >
            <List.Item className="head_list">
              <Typography.Title level={4} style={{ margin: 0 }}>
                Zoo.Net
              </Typography.Title>
            </List.Item>
            <List.Item className="footer_link">
              Copyright ©️ 2023 ZooNet. All Right Reserved,
            </List.Item>
            <List.Item className="footer_link">Privacy Policy</List.Item>
            <List.Item className="footer_link">Terms of use</List.Item>
          </List>
        </Col>
        <Col>
          <List className='footer_list'>
            <List.Item className="footer_title head_list">Компания</List.Item>
            <List.Item className="footer_link" onClick={() => navigate('/about-us')} >о нас</List.Item>
            <List.Item className="footer_link">отзывы</List.Item>
            <List.Item className="footer_link" onClick={() => navigate('/papers')}>
              статьи
            </List.Item>
          </List>
        </Col>
        <Col>
          <List className='footer_list'>
            <List.Item className="footer_title head_list">Объявления</List.Item>
            <List.Item className="footer_link" onClick={() => navigate('/')} >объявления</List.Item>
            <List.Item className="footer_link" onClick={() => navigate('/new-announcement')} >новое объявление</List.Item>
            <List.Item className="footer_link" onClick={() => navigate('/login')}>
              войти
            </List.Item>
          </List>
        </Col>
        <Col>
          <List className='footer_list'>
            <List.Item className="footer_title head_list">Обратная связь</List.Item>
            <List.Item className="footer_link">наша миссия</List.Item>
            <List.Item className="footer_link" onClick={() => setIsModalOpen(true)}>
              оставить отзыв
            </List.Item>
            <List.Item className="footer_link">контакты</List.Item>
          </List>
        </Col>
      </Row>
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
