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

const styleTitle: React.CSSProperties = { 
  fontStyle: 'normal', 
  fontWeight: 500, 
  fontSize: 16, color: 
  '#333333',
  marginLeft: 135
  };

const styleLink: React.CSSProperties = { 
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: 14,
  color: '#000000',
  marginLeft: 135
  };


export const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper style={{ maxWidth: "100%", margin: '0 auto', height: 290, background: "#FAFAFA", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 100 }}>
      <Row gutter={[20, 30]}>
        <Col className="gutter-row" span={7}>
          <div style={style}>
              <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>Zoo.Net</Text>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleTitle}>О нас</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleTitle}>Объявления</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleTitle}>Обратная связь</Link>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={style}>
            <Link to="#" style={ style }>Copyright ©️ 2023 ZooNet. All Right Reserved.</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/about-us" style={styleLink}>Наша миссия</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/announcement" style={styleLink}>Объявления</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Оставить отзыв</Link>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={style}>
            <Link to="#" style={ style }>Privacy Policy</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Отзывы</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/new-announcement" style={{ fontStyle: 'normal', fontWeight: 300, fontSize: 14, color: '#000000', marginLeft: 132 }}>Новое объявление</Link>
        </Col>
        <Col className="gutter-row" span={4}>
          <Link to="#" style={styleLink}>Почта</Link>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Link to="#" style={ style }>Terms of use</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <Link to="#" style={{ fontStyle: 'normal', fontWeight: 300, fontSize: 14, color: '#000000', marginLeft: 190 }}>Статьи о животных</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="/login" style={styleLink}>Войти</Link>
        </Col>
      </Row>
    </FooterWrapper>
  )
}
