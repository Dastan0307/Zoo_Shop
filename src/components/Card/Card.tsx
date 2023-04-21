import { Button, Card, Col, Row, Typography } from 'antd'

import { ClockCircleOutlined } from '@ant-design/icons'
import { AnnouncementCardType } from '@typess/types'

const { Title, Text, Paragraph  } = Typography
const Cards = (value: AnnouncementCardType) => {
  return (
    <>
      <Card hoverable style={{ width: '100%', border: 'none', height: 177 }}>
        <Row>
          <Col span={5}>
            <img
              alt="example"
              src={value.img}
              style={{ width: 137, height: 140, borderRadius: 6 }}
            />
          </Col>
          <Col span={19}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <ClockCircleOutlined /> {value.created_at}
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
              <Title level={4} style={{ fontSize: 18, color: '#80DBA6' }}>
                {value.title}
              </Title>
              <Button
                style={{
                  color: '#333333',
                  marginTop: 4,
                  border: 'none',
                  fontSize: 12,
                }}
              >
                Изменить
              </Button>
            </div>
            <Text strong style={{ fontSize: 18 }}>
              {value.price} ₸
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#BDBDBD',
                display: 'block',
                marginBottom: 5,
              }}
            >{value.category}</Text>
            <Paragraph style={{ maxWidth: '100%', width: '556px' }}>{value.description}</Paragraph>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Cards
