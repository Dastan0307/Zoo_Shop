import { Col, Image, Row, Typography } from 'antd'
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
      <Row className="about-header">
        <Title level={3}>Наша миссия</Title>
        <Paragraph>
          Наша миссия - помочь животным найти добрые руки! Мы хотим объединить
          питомники/приюты/частных заводчиков и людей ищущих на одной платформе, чтобы все
          животные имели шанс найти своего доброго и любящего хозяина.
        </Paragraph>
      </Row>
      <Image preview={false} src={Rectangle} />
    </motion.div>
  )
}
