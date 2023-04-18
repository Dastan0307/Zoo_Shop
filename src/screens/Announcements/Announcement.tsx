import { Button, Col, Layout, Row, Space, Typography, Image, Carousel, Divider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel';
// import { useTypedDispatch, useTypedSelector } from '@hooks/index';
// import { getAnnoun } from '@store/announcements/getAnnoun';
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import  './announcement.scss'
import { useGetAnnouncementQuery } from '@store/announcements/getAnnoun';


const { Sider } = Layout
const { Title, Text, Paragraph } = Typography


const arr: string[] = [
  'https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png',
  'https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png',
  'https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png',
  'https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png'
]


export const Announcements: React.FC = () => {
  // const dispatch = useTypedDispatch()
  // const data = useTypedSelector(state => state.announ.announcement)
  // useEffect(() => {
  //   dispatch(getAnnoun('2'))
  // }, [])

  const { data, isLoading, error } = useGetAnnouncementQuery('2')

  console.log(data);
  

  const carouselRef = useRef<CarouselRef>(null)

  console.log(carouselRef);
  const handlePrev = () => {
    if(carouselRef.current) {
      carouselRef.current.prev()
    }
  }

  const handleNext = () => {
    if(carouselRef.current) {
      carouselRef.current.next()
    }
  }
  

  
  return (
      <div className='announcements'>
        <Row className='title'>
          <Title level={2}>Хороший добрый пес</Title>
          <Text>Редактировать</Text>
        </Row>
        <div className='main'>
          <div className='main__img'>
            <Row className='big-image'>
              <Row>
                <Col>
                  <Carousel ref={carouselRef}>
                    {arr.map((src, index) => (
                      <Image preview={false} key={index} src={src} />
                    ))}
                  </Carousel>
                  <LeftOutlined onClick={handlePrev} />
                  <RightOutlined onClick={handleNext} />
                </Col>
              </Row>
              <Row className='slides__img'>
                <Col>
                  {arr.map((src, index) => (
                    <Image preview={false} key={index} src={src} />
                  ))}
                </Col>
              </Row>
            </Row>
            <div className='description'>
              <Row>
                <Col span={6}><Text className='gray-text'>Местоположение</Text></Col>
                <Col span={12} className='middle-text'><Paragraph>Бишкек</Paragraph></Col>
                <Col span={6}><Text className='addressMap'>Показать на карте</Text></Col>
              </Row>
              <Divider/>
              <Row>
                <Col span={6}><Text className='gray-text'>Описание</Text></Col>
                <Col span={12}><Paragraph className='middle-text'>Хороший и послушный пес. Охраняет двор. Знает несколько команд, например: сидеть, лежать и место. Любит детей</Paragraph></Col>
              </Row>
              <Divider/>
              <Row>
                <Col span={6}><Text className='gray-text'>Категория</Text></Col>
                <Col span={12}><Paragraph className='middle-text'>Собаки</Paragraph></Col>
              </Row>
            </div>
          </div>
          <div className='sider'>
            <Text>5000 KGS</Text>
            <Row>
              <Image src='https://www.latfan.com/u/fotografias/m/2022/8/14/f850x638-25786_103275_4119.png'/>
              <Text>Владимир. Б</Text>
            </Row>
            <Button>Связаться</Button>
          </div>
        </div>
      </div>
  )
}

