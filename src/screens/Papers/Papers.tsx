import { Col, Row, Typography, Image } from 'antd'
import './papers.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography

export const Papers = () =>  {
  const [isHovering, setIsHovering] = useState<boolean | number | null>(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  }

  const handleMouseLeave = () => {
    setIsHovering(false);
  }

  const arr: number[] = [1,1,1,2,3,4,5,6,7,8,9]
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='papers'>
      <Title className='papers__title'>Статьи о животных</Title>
        <Row className='papers__animals'>
          {
            arr &&
            arr.map((item, index) => {
              return (
              <Col onMouseLeave={() => setIsHovering(null)} onMouseEnter={() => setIsHovering(index)} key={index}>
                <div className='papers__img' >
                  <Image
                    preview={false}
                    src='https://www.proplan.ru/sites/owners.proplan.ru/files/styles/article720x340/public/2020-03/shutterstock_155382377_2.jpg?itok=EBJQe5gN'
                  />
                  {isHovering === index && <Link className='papers__link' to={`/papers/${index}`}>Читать полностью</Link>}
                </div>
                <Text>Какие прививки ставить собакам</Text>
                <Paragraph>В этой статье мы расскажем о том, какие прививки нужно ставить собакам чтобы они не болели</Paragraph>
              </Col>
            )})
          }
        </Row>
    </motion.div>
  )
}
