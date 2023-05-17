import { Col, Image, List, Row, Typography } from 'antd'
import { motion } from 'framer-motion'

import Rectangle from '../../assets/Rectangle.png'

import './aboutUs.scss'

const { Title, Paragraph } = Typography

export const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="about-us"
    >
      <Typography.Title level={2}>О нас</Typography.Title>
      <Row justify={'center'}>
        <Col md={12} >
          <Typography.Paragraph>
            Мы команда Энактас Бишкекского Государственного университета имени К.
            Карасаева , представляем наш проект Zoo Net .
          </Typography.Paragraph>
          <Typography.Paragraph>
            Zoo Net это сайт по обмену домашних животных, где будет актуальная база
            питомцев со всех регионов страны. Это один общий портал, где пользователь
            может купить, продать или отдать даром любой вид животного.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Мы объединили все приюты, фонды, ветеринарные клиники и питомники на одной
            платформе. Кроме этого на сайте можно найти ветеринаров и zoo нянь. Мы создаем
            все для удобства хозяев животных
          </Typography.Paragraph>

          <Typography.Paragraph>
            Наша Миссия - помочь животным найти добрые руки , чтобы все питомцы имели шанс
            найти своего доброго и любящего хозяина. Помочь им обрести тепло, уют и
            заботу.
          </Typography.Paragraph>
        </Col>
        <Col md={12} >
          <Image preview={false} style={{ height: '300px', objectFit: 'cover' }} src='/Rectangle.png' />
        </Col>
      </Row>
      <List header="Наши цели:" bordered={false} className="about_content_list">
        <List.Item style={{ border: 0, padding: '3px 0' }}>
          1. Создать удобную онлайн-платформу для владельцев питомцев и любителей
          животных.
        </List.Item>
        <List.Item style={{ border: 0, padding: '3px 0' }}>
          2. Уменьшить количество бездомных животных в Кыргызстане.
        </List.Item>
        <List.Item style={{ border: 0, padding: '3px 0' }}>
          3. Улучшить экосистему Кыргызстана, поддерживая животный мир и улучшая их
          условия жизни.
        </List.Item>
      </List>
      <Typography.Paragraph>
        Мы хотим сделать Кыргызстан более заботливым и дружественным к животным и создать
        платформу, где каждый может внести свой вклад в улучшение благополучия наших милых
        питомцев и сохранение дикой природы.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Мы уверены, что каждое животное заслуживает любящего и заботливого дома.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Присоединяйтесь к нашей платформе Zoo Net прямо сейчас и воспользуйтесь удобствами
        и преимуществами . Найдите идеального питомца или подарите надежного друга .
        Расширьте свои возможности и обеспечьте максимальный комфорт для своего питомца
        уже сегодня! Присоединитесь к Zoo Net!
      </Typography.Paragraph>
    </motion.div>
  )
}
