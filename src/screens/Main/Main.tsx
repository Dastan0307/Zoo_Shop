import { Button, Card, Col, Input, Layout, List, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Search from 'antd/es/transfer/search'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

import { useGetCategoriesQuery } from '@store/features/category/categorySevice'

import './main.scss'

export const Main = () => {
  const [params, setParams] = useState<string>()
  const data = useGetCategoriesQuery('s')
  const categories = data.currentData?.results
  debounce

  return (
    <div className="main">
      <Search placeholder="Поиск" />
      <Row className="main_type_wrapper">
        <Col span={11}>
          <Card className="main_type">
            <Typography.Title level={3}>Питомцы</Typography.Title>
            <Typography.Text>Выберите питомца по душе</Typography.Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="main_type_2">
            <Typography.Title level={3}>Питомцы</Typography.Title>
            <Typography.Text>Выберите питомца по душе</Typography.Text>
          </Card>
        </Col>
      </Row>
      <Layout>
        <Sider style={{ background: '#F5F5F5' }}>
          <Row>
            <Col>
              <Typography.Title level={4}>Категории</Typography.Title>
              <List>
                {categories &&
                  categories.map((value, index) => (
                    <List.Item key={index}>{value.title}</List.Item>
                  ))}
              </List>
            </Col>
            <Col>
              <Typography.Title level={5}>
                Дополнительные категории
              </Typography.Title>
              <List>
                {[
                  'Частные лица',
                  'Ветеринарные клиники',
                  'Зоомагазины',
                  'Хостелы/приюты',
                  'Зооняни',
                ].map((value, index) => (
                  <List.Item key={index}>{value}</List.Item>
                ))}
              </List>
            </Col>
            <Col>
              <Typography.Title level={5}>Цена</Typography.Title>
              <div style={{ display: 'flex' }}>
                <Input placeholder="От" />
                <Input placeholder="До" />
              </div>
              <Button style={{ width: '100%' }}>Договорная</Button>
            </Col>
            <Col>
              <Typography.Title level={5}>Город/Регион</Typography.Title>
              <Input placeholder="Весь Кыргызстан" />
            </Col>
            <Col>
              <Typography.Title level={5}>Тэги</Typography.Title>
              <Input placeholder="Тэги" />
            </Col>
          </Row>
        </Sider>
        <Content style={{ background: 'gray' }}>content</Content>
      </Layout>
    </div>
  )
}
