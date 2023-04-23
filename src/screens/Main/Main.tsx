import {
  Button,
  Card,
  Col,
  Input,
  Layout,
  List,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React, { useEffect, useState } from 'react'

import { AnnouncementApi } from '@api/AnnouncementApi'
import Cards from '@components/Card/Card'
import { useGetAnnouncementsQuery } from '@store/announcements/getAnnoun'
import { useGetCategoriesQuery } from '@store/features/category/categorySevice'
import { AnnouncementFilterType, CategoryType } from '@typess/types'
import { debounce } from '@utils/debounce'

import './main.scss'

export const Main = () => {
  const [params, setParams] = useState<AnnouncementFilterType>({})
  const { currentData } = useGetCategoriesQuery('2')
  const [type, setType] = useState<'pets' | 'org'>('pets')
  const categories = currentData?.results
  const res = useGetAnnouncementsQuery(params)
  const announ = res.currentData
  console.log(res)
  // refetch()
  // AnnouncementApi.getAnnouncement(params)

  const handleSetParamsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // res.refetch()
    if (e.target.dataset.key == 'lower_price' || e.target.dataset.key == 'lower_price') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return setParams({
        ...params,
        [e.target.name]: +e.target.dataset.value!,
      })
    }

    setParams({ ...params, [e.target.name]: e.target.value })
  }
  const handleSetParamsValue2 = (value: CategoryType) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setParams({ ...params, category: value.slug })
  }
  const handlePriceButton = () =>
    setParams({ ...params, lower_price: -1, higher_price: -1 })
  const setSelectLocation = (location: string) => setParams({ ...params, location })
  const debouncedOnChange = debounce(handleSetParamsValue, 500)

  return (
    <div className="main">
      <Input placeholder="Поиск" onChange={debouncedOnChange} name="search" />
      <Row className="main_type_wrapper">
        <Col span={12}>
          <Card className="main_type">
            <Typography.Title level={3}>Питомцы</Typography.Title>
            <Typography.Text>Выберите питомца по душе</Typography.Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="main_type_2">
            <Typography.Title level={3}>Организации</Typography.Title>
            <Typography.Text>
              Ветеринарные клиники, <br /> зоомагазины и приюты
            </Typography.Text>
          </Card>
        </Col>
      </Row>
      <Layout style={{ display: 'flex', gap: '30px' }}>
        <Sider className="sideBar">
          <Row>
            <Col style={{ width: '100%' }}>
              <Row className="sideBar_title">
                <div>
                  <Typography.Title level={4}>Категории</Typography.Title>
                </div>
                <Typography.Text onClick={() => setParams({})}>Очистить</Typography.Text>
              </Row>
              <List>
                {categories &&
                  categories.map((value, index) => (
                    <List.Item
                      className="category_list_item active"
                      style={{ border: 'none' }}
                      onClick={() => handleSetParamsValue2(value)}
                      // data-key="category"
                      // data-value={value.slug}
                      key={index}
                    >
                      <span>{value.title}</span>
                    </List.Item>
                  ))}
              </List>
            </Col>
            <Col>
              <Typography.Title level={5}>Цена</Typography.Title>
              <div style={{ display: 'flex', gap: '7px' }}>
                <Input
                  type="number"
                  style={{ height: '42px' }}
                  placeholder="От"
                  name="lower_price"
                  onChange={debouncedOnChange}
                />
                <Input
                  type="number"
                  style={{ height: '42px' }}
                  placeholder="До"
                  name="higher_price"
                  onChange={debouncedOnChange}
                />
              </div>
              <Button
                style={{ width: '100%', height: '42px', marginTop: '7px' }}
                onClick={handlePriceButton}
              >
                Договорная
              </Button>
            </Col>
            <Col style={{ width: '100%' }}>
              <Typography.Title level={5}>Город/Регион</Typography.Title>
              {/* <Input
                placeholder="Весь Кыргызстан"
                name="location"
                onChange={debouncedOnChange}
              /> */}
              <Select
                className="select"
                style={{ width: '100%' }}
                size={'large'}
                placeholder="Весь Кыргызстан"
                onChange={setSelectLocation}
                mode="multiple"
                optionLabelProp="label"
              >
                <Select.Option value={'Бишкек'}>Бишкек</Select.Option>
                <Select.Option value={'Ош'}>Ош</Select.Option>
                <Select.Option value={'Нарын'}>Нарын</Select.Option>
                <Select.Option value={'Иссык-Куль'}>Иссык-Куль</Select.Option>
                <Select.Option value={'Баткен'}>Баткен</Select.Option>
                <Select.Option value={'Джалал-Абад'}>Джалал-Абад</Select.Option>
              </Select>
            </Col>
          </Row>
        </Sider>
        <Content className="main-content">
          {announ &&
            announ.map((value) => <Cards value={value} type="main" key={value.slug} />)}
        </Content>
      </Layout>
    </div>
  )
}
