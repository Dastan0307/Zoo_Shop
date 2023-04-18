import { Header as HeaderWrapper } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { Typography, Col } from 'antd';
import { PrimaryButton } from '..';


const { Text } = Typography;


export const Header = () => {
  return (
    <HeaderWrapper style={{ background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 70 }}>Zoo.Net</Text>
          <Col>
            <Link to="#" style={{ color: '#333333', border: 'none', background: 'transparent', marginRight: 75 }}>О нас</Link>
            <Link to="#" style={{ color: '#333333', border: 'none', background: 'transparent', marginRight: 75 }}>Статьи</Link>
            <Link to={'/login'} style={{ color: '#333333', border: 'none', background: 'transparent', marginRight: 75 }}>Войти</Link>
            <PrimaryButton style={{ color: '#FFFFFF', width: 212, height: 40, marginRight: 80 }}>Новое объявление</PrimaryButton>
          </Col>
    </HeaderWrapper>
  )
}
