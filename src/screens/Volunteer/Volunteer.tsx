import { Col, Image, List, Row, Typography } from 'antd'
import { motion } from 'framer-motion'

import './Volunteer.scss'

export const Volunteer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="volunteer"
    >
      <Typography.Title level={2}>Стать волонтёром </Typography.Title>
      <Row>
        <Col xs={24} md={16}>
          <Typography.Paragraph>
            Присоединяйтесь к нашей группе зоо волонтёров! Участвуйте в защите и уходе за
            животными, организации мероприятий и образовательных программ. Получите ценный
            опыт, расширьте знания и встретьте единомышленников. Присоединяйтесь к нам и
            станьте частью сообщества ZOO NET Kyrgyzstan!
          </Typography.Paragraph>
          <Col>
            <List header="Условия для волонтеров:">
              <List.Item>1. Возраст от 16 лет</List.Item>
              <List.Item>2. Иметь желание помогать животным</List.Item>
              <List.Item>3. Иметь свободное время для волонтерства</List.Item>
            </List>
          </Col>
          <Typography.Paragraph>
            Если хочешь стать волонтером и помогать животным, то переходи по ссылке и
            заполняй анкету!
          </Typography.Paragraph>
          <Row className='volunteer_telegram'>
          <Typography.Link   href="https://t.me/zoonetkg">
            https://t.me/zoonetkg
          </Typography.Link>
          </Row>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Image preview={false} height={250} src={'/users-alt.png'} />
        </Col>
      </Row>
    </motion.div>
  )
}
