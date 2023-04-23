import { Card, Col, Row,Typography } from 'antd';
import { useSelector } from 'react-redux';

import avatar from '../../assets/A.png';
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import  Cards  from '../../components/Card/Card';
import { useEffect } from 'react';
import  { fetchCards }  from '../../store/features/details/detailsSlice';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';

const { Title, Text, Link } = Typography;

export const ProfilePage = () => {
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const dispatch = useTypedDispatch();
  const { data, status, error } = useTypedSelector((state: RootState) => state.card);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  
  const dataCount = data.slice(3);
  
  // Get current data 
  const now = new Date();
  const time: string = now.toLocaleTimeString();
  
  

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' , background: 'white', display: 'flex', justifyContent: 'center', paddingTop: 40, paddingBottom: 80 }}>
      <Row>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 275, border: 'none', marginRight: 300 }}
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
          {
            dataCount.map((card) => (
              <Cards 
                key={card.id} 
                title={card.title} 
                created_at={time} 
                description={card.description} 
                price={card.price} 
                img={card.img} 
                category={card.ageGender} />
            ))
          }
        </Col>
      </Row>
    </div>
  )
}
