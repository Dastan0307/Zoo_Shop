import { Card, Typography, Col, Row, Button } from 'antd';;
import { ClockCircleOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { RootState } from '../../store/store';
import  { fetchCards }  from '../../store/features/details/detailsSlice';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';

const { Title, Text, Paragraph } = Typography;


const Cards: React.FC = () => {
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
  
  return (
    <>
      {dataCount.map((card) => (
        <Card
            hoverable
            style={{ width: '100%', border: 'none', height: 177 }}
            key={card.id}
            >
              <Row>
                <Col span={5}><img src={card.img} alt="error :("  style={{ width: 137, height: 140, borderRadius: 6 }} /></Col>
                <Col span={19}>
                  <Text type="secondary" style={{ fontSize: 12 }}><ClockCircleOutlined /> Вчера</Text>
                  <div style={{width: 600, display: 'flex', justifyContent: 'space-between', marginBottom: -13, marginTop: -3}}>
                    <Title level={4} style={{ fontSize: 18, color: '#80DBA6'}}>{card.title}</Title>
                    <Button style={{color: '#333333', marginTop: 4, border: 'none', fontSize: 12}}>Изменить</Button>
                  </div>
                  <Text strong style={{fontSize: 18 }}>{card.price} ₸</Text>
                  <Text style={{ fontSize: 12, color: '#BDBDBD', display: 'block',  marginBottom: 5}}>{card.ageGender}</Text>
                  <Paragraph style={{width: 550 }}>{card.description}</Paragraph>
                </Col>
              </Row>
          </Card>
        ))}
    </>
  )
};

export default Cards;
