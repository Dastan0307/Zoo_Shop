import { Col, Image, List, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import './Volunteer.scss'

export const Volunteer = () => {
  return (
    <div className="volunteer">
      <Row className="volunteer_title">
        <Typography.Title level={2}>Стать волонтёром </Typography.Title>
      </Row>
      <Row>
        <Typography.Paragraph>
          Присоединяйтесь к нашей группе зоо волонтёров! Участвуйте в защите и уходе за
          животными, организации мероприятий и образовательных программ. Получите ценный
          опыт, расширьте знания и встретьте единомышленников. Присоединяйтесь к нам и
          станьте частью сообщества ZOO NET Kyrgyzstan!
        </Typography.Paragraph>
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <List header="Условия для волонтеров:">
            <List.Item>1. Возраст от 16 лет</List.Item>
            <List.Item>2. Иметь желание помогать животным</List.Item>
            <List.Item>3. Иметь свободное время для волонтерства</List.Item>
          </List>
        </Col>
        <Col>
          <Image height={250} src={'/users-alt.png'} />
        </Col>
      </Row>
      <Row>
        <Typography.Paragraph>
          Если хочешь стать волонтером и помогать животным, то переходи по ссылке и
          заполняй анкету!
        </Typography.Paragraph>
      </Row>
    </div>
  )
}
