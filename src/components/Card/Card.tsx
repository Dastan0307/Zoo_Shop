import { Card, Typography, Col, Row, Button } from 'antd';;
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const Cards = () => {
  return (
    <>
      <Card
          hoverable
          style={{ width: 795, border: 'none', height: 177 }}
          >
            <Row>
              <Col span={5}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{ width: 137, height: 140, borderRadius: 6 }} /></Col>
              <Col span={19}>
                <Text type="secondary" style={{ fontSize: 12 }}><ClockCircleOutlined /> Вчера</Text>
                <div style={{width: 600, display: 'flex', justifyContent: 'space-between', marginBottom: -13, marginTop: -3}}>
                  <Title level={4} style={{ fontSize: 18, color: '#80DBA6'}}>Хороший добрый пес</Title>
                  <Button style={{color: '#333333', marginTop: 4, border: 'none', fontSize: 12}}>Изменить</Button>
                </div>
                <Text strong style={{fontSize: 18 }}>5000 ₸</Text>
                <Text style={{ fontSize: 12, color: '#BDBDBD', display: 'block',  marginBottom: 5}}>2 года • Мальчик</Text>
                <Paragraph style={{width: 550 }}>
                  Хороший и послушный пес. Охраняет двор. Знает несколько команд, например: сидеть, лежать и место. Любит детей
                </Paragraph>
              </Col>
            </Row>
        </Card>
    </>
  )
};

export default Cards;
