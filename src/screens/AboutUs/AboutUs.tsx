import { Row, Col, Image, Typography} from 'antd'
import Rectangle from '../../assets/Rectangle.png'
import './aboutUs.scss'
const { Title, Paragraph } = Typography

export const AboutUs = () => {
  return (
    <div className="about-us">
      <Row className='about-header'>
        <Title level={3}>Наша миссия</Title>
        <Paragraph>Наша миссия - помочь животным найти добрые руки! Мы хотим объединить питомники/приюты/частных заводчиков и людей ищущих на одной платформе, чтобы все животные имели шанс найти своего доброго и любящего хозяина.</Paragraph>
      </Row>
      <Image preview={false} src={Rectangle}/>
    </div>
  )
}
