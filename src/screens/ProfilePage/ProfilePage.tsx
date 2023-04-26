import { Card, Col, Row,Typography } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import avatar from '../../assets/A.png';
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import  Cards  from '../../components/Card/Card';
import { useEffect } from 'react';
import  { fetchCards }  from '../../store/features/details/detailsSlice';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import './profile.scss'

const { Title, Text } = Typography;

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

            <Text type="secondary">{user.location}</Text>
            <Text style={{ width: 275, display: 'block' ,marginTop: 20 }}>{user.about_user}</Text>
            
            <Row gutter={[20, 20]} style={{marginTop: 30}} className='links'>
              <Col span={24}>
                <NavLink to="/profile" >Мои объявления</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to="/editProfile" >Редактирование</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to='/' >Новое объявление</NavLink>
              </Col>
              <Col span={24}>
                <NavLink to='/' >Выход</NavLink>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          {
            dataCount.map((card) => (
              <Cards
                key={card.id} 
                // img={card.img}  
                // category={card.category}
                // created_at={card.created_at}
                // description={card.description}
                // location={card.location}
                // price={card.price}
                // slug={card.slug}
                // title={card.title}
                // update_at={card.updated_at}
                // user={card.user}
                // count={card.views_count}
                />

            ))
          }
        </Col>
      </Row>
    </div>
  )
}
