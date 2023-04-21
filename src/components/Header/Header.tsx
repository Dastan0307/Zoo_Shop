import { Header as HeaderWrapper } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { Typography, Col } from 'antd';
import { PrimaryButton } from '..';


const { Text } = Typography;


export const Header = () => {
  return (
    <HeaderWrapper style={{ maxWidth: '100%', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 70 }}>Zoo.Net</Text>
          <Col>
            <Link to="#" style={{ color: '#333333', border: 'none', background: 'transparent', marginRight: 65 }}>О нас</Link>
            <Link to="#" style={{ color: '#333333', border: 'none', background: 'transparent', marginRight: 55 }}>Статьи</Link>
            <Link to={'/login'} style={{ padding: '10px 25px', color: '#333333', background: 'transparent', marginRight: 20, border: '1px solid #828282', borderRadius: 6 }}>Войти</Link>
            <PrimaryButton style={{ color: '#FFFFFF', width: 212, height: 40, marginRight: 80 }}>Новое объявление</PrimaryButton>
          </Col>
    </HeaderWrapper>
  )
}
