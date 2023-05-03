import { Col, Row, Typography, Image } from 'antd'
import './paper.scss'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { ShortDescription } from '@typess/types'
import { useEffect, useState } from 'react'
import { getNewsById } from '@store/papers/papers'

const { Title, Text, Paragraph } = Typography
const arr: number[] = [1,2,3]



export const Paper = () => {
  const [paper, setPaper] = useState<ShortDescription | null>(null)
  const { id } = useParams()
  
  useEffect(() => {
    getNewsById(id).then(res => setPaper(res))
  }, [id])

  console.log(paper);
  
  
  return (
    <motion.div initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }} className='paper'>
      <Title className='paper__title'>{paper?.title}</Title>
      <Row className='paper__start'>
        <Col>
          <div>
            <Text></Text>
            <Paragraph>
              {paper?.body}
            </Paragraph>
          </div>
          <div>
            <Text>Правила вакцинации собак</Text>
            <Paragraph>
              {paper?.short_description}
            </Paragraph>
          </div>
        </Col>
        <Col>
          <Image
            preview={false}
            src={paper?.image}
            alt='animal'
            />
        </Col>
      </Row>
      {/* <Row className='paper__main'>
        <Text>Как подготовить собаку к процедуре</Text>
        <Paragraph>Владелец должен наблюдать за состоянием собаки, обеспечить полноценное питание и контролировать стул. В случае выявления определенных признаков заболеваемости следует обратиться к ветеринару и детально разъяснить, какие признаки вызывают подозрения. Врач проведет контрольный осмотр, при необходимости возьмет анализы. Если подтвердится нездоровое состояние животного, вакцинация будет перенесена до полного выздоровления собаки.</Paragraph>
        <Text className='block'>Подготовка собаки:</Text>
        <ol>
          {
            arr.map(item => {
              return (
                <li key={item}>
                Исключить на несколько дней до процедуры контакты с другими животными.
                </li>
              )
            })
          }
        </ol>
      </Row>
      <Row className='paper__footer'>
        <Text>Уход за питомцем после прививки</Text>
        <Paragraph>После вакцинации необходимо соблюдать некоторые рекомендации специалистов по уходу.</Paragraph>
        <Text className='block'>Что нужно делать:</Text>
        <ol>
          {
            arr.map((item, index) => {
              return (
                <li key={item}>
                <span>{index + 1}. </span>Исключить на несколько дней до процедуры контакты с другими животными.
                </li>
              )
            })
          }
        </ol>
        <Paragraph>Детальные рекомендации по уходу за собакой после процедуры иммунизации выдает лечащий ветеринар.
        </Paragraph>
      </Row> */}
    </motion.div>
    
  )
}

