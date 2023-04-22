import { Footer as FooterWrapper } from "antd/es/layout/layout";
import { Typography, Col, Row } from 'antd';
import { Link } from 'react-router-dom';


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
  return (
    <FooterWrapper style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', height: 290, background: "#FAFAFA", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 100 }}>
      <Row gutter={[20, 30]}>
        <Col className="gutter-row" span={8}>
          <div style={style}>
              <Text style={{ color: '#333333', fontSize: 24, fontWeight: 700, marginLeft: 10 }}>Zoo.Net</Text>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleTitle}>О нас</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleTitle}>Объявления</Link>
        </Col>
        <Col className="gutter-row" span={3}>
          <Link to="#" style={styleTitle}>Контакты</Link>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <Link to="#" style={ style }>Copyright ©️ 2023 ZooNet. All Right Reserved.</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Наша миссия</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Объявления</Link>
        </Col>
        <Col className="gutter-row" span={3}>
          <Link to="#" style={styleLink}>Адрес</Link>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <Link to="#" style={ style }>Privacy Policy</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Отзывы</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Новое объявление</Link>
        </Col>
        <Col className="gutter-row" span={3}>
          <Link to="#" style={styleLink}>Телефон</Link>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <Link to="#" style={ style }>Terms of use</Link>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Статьи о животных</Link>
        </Col>
        <Col className="gutter-row" span={5}>
          <Link to="#" style={styleLink}>Войти</Link>
        </Col>
        <Col className="gutter-row" span={3}>
          <Link to="#" style={styleLink}>Почта</Link>
        </Col>
      </Row>
    </FooterWrapper>
  )
}
