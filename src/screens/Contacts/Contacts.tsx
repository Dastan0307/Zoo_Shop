import { Card, Col, Image, Row, Typography } from 'antd'
import { motion } from 'framer-motion'

import {
  InstagramOutlined,
  LaptopOutlined,
  MessageOutlined,
  PhoneOutlined,
  PullRequestOutlined,
} from '@ant-design/icons'

import './contacts.scss'

export const Contacts = () => {
  return (
    <motion.div
      className="contacts"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ height: 100 }}>
        {' '}
        <Typography.Title className="contacts_title" level={2}>
          Контакты
        </Typography.Title>
      </div>
      <Row style={{ width: '100%', marginTop: 20 }} justify={'space-between'}>
        <Col xs={24} md={12} lg={8}>
          <div className="contacts_card">
            <PhoneOutlined style={{ fontSize: 43, color: '#FFD02b' }} />
            <Typography.Title className="contacts_card_title" level={4}>
              1. Позвоните нам
            </Typography.Title>
            <Typography.Paragraph className="contacts_card_parag">
              Есть вопросы? <br /> Мы поможем !{' '}
            </Typography.Paragraph>
            <a href="tel:+996 502 154 589">+996 502 154 589</a>
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="contacts_card">
            <MessageOutlined style={{ fontSize: 43, color: '#FFD02b' }} />
            <Typography.Title className="contacts_card_title" level={4}>
              2. Напишите нам
            </Typography.Title>
            <Typography.Paragraph className="contacts_card_parag">
              Идеи? Предложения? Мы открыты для любых вопросов !
            </Typography.Paragraph>
            <a href="mailto:zoonet.kg@gmail.com"> zoonet.kg@gmail.com</a>
          </div>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <div className="contacts_card">
            <LaptopOutlined style={{ fontSize: 43, color: '#FFD02b' }} />
            <Typography.Title className="contacts_card_title" level={4}>
              3. Мы в соц. Сетях
            </Typography.Title>
            <Typography.Paragraph className="contacts_card_parag">
              Подписывайтесь и следите за обновлениями <br />
            </Typography.Paragraph>
            <Row gutter={10}>
              <Col>
                <a
                  target="_blank"
                  style={{ display: 'flex', alignItems: 'center' }}
                  href="https://instagram.com/zoonet_kg"
                  rel="noreferrer"
                >
                  {' '}
                  <InstagramOutlined
                    style={{ fontSize: 18, marginRight: '5px', color: '#FFD02b' }}
                  />{' '}
                  @zoonet_kg
                </a>
              </Col>
              <Col>
                <a
                  target="_blank"
                  style={{ display: 'flex', alignItems: 'center' }}
                  href="https://t.me/zoonetkg "
                  rel="noreferrer"
                >
                  {' '}
                  <Image
                    style={{ width: 18, marginRight: '5px' }}
                    preview={false}
                    src="/telegram.png"
                  />{' '}
                  @zoonet_kg
                </a>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </motion.div>
  )
}
