import { Col, Row,Typography } from 'antd';
import { Footer as FooterWrapper } from "antd/es/layout/layout";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './footer.scss'


const { Text } = Typography;

const style: React.CSSProperties = { 
    fontStyle: 'normal', 
    fontWeight: 300, 
    fontSize: 14, 
    color: '#828282',
    marginLeft: 10
  };



export const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper className='footer'>
      <Row gutter={[20, 30]} className='footer_container'>
        <Col className="gutter-row" span={7}>
          <div className='footer__link-div'>
              <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>Zoo.Net</Text>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className='footer__title'>О нас</Text>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className='footer__title'>Объявления</Text>
        </Col>
        <Col className="gutter-row" span={5}>
          <Text className='footer__title'>Обратная связь</Text>
        </Col>
        <Col className="gutter-row" span={7}>
          <div className='footer__link-div'>
            <Link to="#" style={ style }>Copyright ©️ 2023 ZooNet. All Right Reserved.</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/about-us" className='footer__link'>Наша миссия</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/announcement" className='footer__link'>Объявления</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" className='footer__link'>Оставить отзыв</Link>
        </Col>
        <Col className="gutter-row" span={7}>
          <div className='footer__link-div'>
            <Link to="#" style={ style }>Privacy Policy</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" className='footer__link'>Отзывы</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/new-announcement" className='footer__link footer__link_long-word'>Новое объявление</Link>
        </Col>
        <Col className="gutter-row" span={4}>
          <Link to="#" className='footer__link'>Почта</Link>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className='footer__link-div'>
            <Link to="#" className='footer__link-div'>Terms of use</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <Link to="#" className='footer__link_mg'>Статьи о животных</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/login" className='footer__link'>Войти</Link>
        </Col>
      </Row>
      <div className="footer_mobil">
        <div className="footer__mb_list">
          <div className="list list_1">
            <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>Zoo.Net</Text>
            <Link to={'#'}>Copyright ©️ 2023 ZooNet. All Right Reserved,</Link>
            <Link to={'#'}>Privacy Policy</Link>
            <Link to={'#'}>Terms of use</Link>
          </div>
          <div className="list">
            <Text>О нас</Text>
            <Link to={'#'}>Наша миссия</Link>
            <Link to={'#'}>Отзывы</Link>
            <Link to={'#'}>Статьи о животных</Link>
          </div>
          <div className="list">
            <Text>Объявления</Text>
            <Link to={'#'}>Объявления</Link>
            <Link to={'#'}>Новое объявление</Link>
            <Link to={'#'}>Войти</Link>
          </div>
          <div className="list">
            <Text>Обратная связь</Text>
            <Link to={'#'}>Оставить отзыв</Link>
            <Link to={'#'}>Почта</Link>
            <Link to={'#'}></Link>
          </div>
        </div>
      </div>
    </FooterWrapper>
  )
}
