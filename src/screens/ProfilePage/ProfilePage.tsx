import { AutoComplete, Button, Card, Col, Row, Typography } from 'antd'

import { ClockCircleOutlined } from '@ant-design/icons'

import avatar from '../../assets/A.png'

const { Title, Text, Link, Paragraph } = Typography

export const ProfilePage = () => {
  return (
    <div
      style={{ background: 'white', display: 'flex', justifyContent: 'center' }}
    >
      <Row>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 275, border: 'none', marginRight: 250 }}
          >
            <img
              alt="example"
              src={avatar}
              style={{ width: 100, height: 100, borderRadius: 90 }}
            />
            <Title level={4}>Владимир. Б</Title>

            <Text type="secondary">Г. Бишкек</Text>
            <Text style={{ display: 'block', marginTop: 20 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry is standard dummy text
              ever since the 1500s.
            </Text>

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={24}>
                <Link
                  href="#"
                  type="success"
                  underline
                  style={{ color: '#80DBA6', fontWeight: 500 }}
                >
                  Мои объявления
                </Link>
              </Col>
              <Col span={24}>
                <Text strong>Редактирование</Text>
              </Col>
              <Col span={24}>
                <Text strong>Новое объявление</Text>
              </Col>
              <Col span={24}>
                <Text strong>Выход</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Card hoverable style={{ width: 795, border: 'none' }}>
            <Row>
              <Col span={5}>
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 137, height: 140, borderRadius: 6 }}
                />
              </Col>
              <Col span={19}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined /> Вчера
                </Text>
                <div
                  style={{
                    width: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -13,
                    marginTop: -3,
                  }}
                >
                  <Title level={4} style={{ color: '#80DBA6' }}>
                    Хороший добрый пес
                  </Title>
                  <Button
                    style={{ color: '#333333', marginTop: 4, border: 'none' }}
                  >
                    Изменить
                  </Button>
                </div>
                <Text strong style={{ fontSize: 18 }}>
                  5000 ₸
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#BDBDBD',
                    display: 'block',
                    marginBottom: 5,
                  }}
                >
                  2 года • Мальчик
                </Text>
                <Paragraph style={{ width: 550 }}>
                  Хороший и послушный пес. Охраняет двор. Знает несколько
                  команд, например: сидеть, лежать и место. Любит детей
                </Paragraph>
              </Col>
            </Row>
          </Card>
          <Card hoverable style={{ width: 795, border: 'none' }}>
            <Row>
              <Col span={5}>
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 137, height: 140, borderRadius: 6 }}
                />
              </Col>
              <Col span={19}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined /> Вчера
                </Text>
                <div
                  style={{
                    width: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -13,
                    marginTop: -3,
                  }}
                >
                  <Title level={4} style={{ color: '#80DBA6' }}>
                    Хороший добрый пес
                  </Title>
                  <Button
                    style={{ color: '#333333', marginTop: 4, border: 'none' }}
                  >
                    Изменить
                  </Button>
                </div>
                <Text strong style={{ fontSize: 18 }}>
                  5000 ₸
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#BDBDBD',
                    display: 'block',
                    marginBottom: 5,
                  }}
                >
                  2 года • Мальчик
                </Text>
                <Paragraph style={{ width: 550 }}>
                  Хороший и послушный пес. Охраняет двор. Знает несколько
                  команд, например: сидеть, лежать и место. Любит детей
                </Paragraph>
              </Col>
            </Row>
          </Card>
          <Card hoverable style={{ width: 795, border: 'none' }}>
            <Row>
              <Col span={5}>
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 137, height: 140, borderRadius: 6 }}
                />
              </Col>
              <Col span={19}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined /> Вчера
                </Text>
                <div
                  style={{
                    width: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -13,
                    marginTop: -3,
                  }}
                >
                  <Title level={4} style={{ color: '#80DBA6' }}>
                    Хороший добрый пес
                  </Title>
                  <Button
                    style={{ color: '#333333', marginTop: 4, border: 'none' }}
                  >
                    Изменить
                  </Button>
                </div>
                <Text strong style={{ fontSize: 18 }}>
                  5000 ₸
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#BDBDBD',
                    display: 'block',
                    marginBottom: 5,
                  }}
                >
                  2 года • Мальчик
                </Text>
                <Paragraph style={{ width: 550 }}>
                  Хороший и послушный пес. Охраняет двор. Знает несколько
                  команд, например: сидеть, лежать и место. Любит детей
                </Paragraph>
              </Col>
            </Row>
          </Card>
          <Card hoverable style={{ width: 795, border: 'none' }}>
            <Row>
              <Col span={5}>
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 137, height: 140, borderRadius: 6 }}
                />
              </Col>
              <Col span={19}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined /> Вчера
                </Text>
                <div
                  style={{
                    width: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -13,
                    marginTop: -3,
                  }}
                >
                  <Title level={4} style={{ color: '#80DBA6' }}>
                    Хороший добрый пес
                  </Title>
                  <Button
                    style={{ color: '#333333', marginTop: 4, border: 'none' }}
                  >
                    Изменить
                  </Button>
                </div>
                <Text strong style={{ fontSize: 18 }}>
                  5000 ₸
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#BDBDBD',
                    display: 'block',
                    marginBottom: 5,
                  }}
                >
                  2 года • Мальчик
                </Text>
                <Paragraph style={{ width: 550 }}>
                  Хороший и послушный пес. Охраняет двор. Знает несколько
                  команд, например: сидеть, лежать и место. Любит детей
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
