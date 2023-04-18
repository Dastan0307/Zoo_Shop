import { Card, Typography, Col, Row } from 'antd';
import avatar from '../../assets/A.png';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { setCredentials } from '../../store/features/auth/authSlice';
import  Cards  from '../../components/Card/Card';

const { Title, Text, Link } = Typography;

export const ProfilePage = () => {
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  return (
    <div style={{  background: 'white', display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
      <Row>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 275, border: 'none', marginRight: 250 }}
          >
            <img alt="example" src={avatar} style={{ width: 100, height: 100, borderRadius: 90, marginBottom: 5 }} />
            <Title level={4}>{user.first_name}</Title>

            <Text type="secondary">Г. Бишкек</Text>
            <Text style={{ width: 275, display: 'block' ,marginTop: 20 }}>{user.about_user}</Text>
            
            <Row gutter={[16, 16]} style={{marginTop: 30}}>
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
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
        </Col>
      </Row>
    </div>
  )
}
