import { Col, Row, Typography, Image } from 'antd'
import './papers.scss'
import { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getNews } from '@store/papers/papers'
import { ShortDescription } from '@typess/types'

const { Title, Text, Paragraph } = Typography

export const Papers = () =>  {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [news, setNews] = useState<ShortDescription[] | null>(null)

  useEffect(() => {
    getNews().then(data => {
      setNews(data.results)
    })
  }, [])

  console.log(news);
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='papers'>
      <Title className='papers__title'>Статьи о животных</Title>
        <Row className='papers__animals'>
          {
            news &&
            news.map((item, index) => {
              return (
              <Col xl={{span: 24}} onMouseLeave={() => setIsHovering(null)} onMouseEnter={() => setIsHovering(index)} key={index}>
                <div className='papers__img' >
                  <Image
                    preview={false}
                    src={item.image}
                  />
                  {isHovering === index && <Link className='papers__link' to={`/papers/${item.id}`}>Читать полностью</Link>}
                </div>
                <Text>{item.title}</Text>
                <Paragraph>{item.body}</Paragraph>
              </Col>
            )})
          }
        </Row>
    </motion.div>
  )
}
