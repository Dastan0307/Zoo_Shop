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
import { AnnouncementFilterType } from '@typess/types'
import { debounce } from '@utils/debounce'

import './main.scss'

export const Main = () => {
  const [params, setParams] = useState<AnnouncementFilterType>({})
  const {currentData,refetch} = useGetCategoriesQuery('s')
  const categories = currentData?.results
  const res = useGetAnnouncementsQuery('')
  const announ = res.currentData?.results
  console.log(announ)
  // refetch()
  // AnnouncementApi.getAnnouncement(params)

  const handleSetParamsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.dataset.key == 'lower_price' ||
      e.target.dataset.key == 'lower_price'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return setParams({
        ...params,
        [e.target.name]: +e.target.dataset.value!,
      })
    }

    setParams({ ...params, [e.target.name]: e.target.value })
  }
  const handleSetParamsValue2 = (e: React.ChangeEvent<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setParams({ ...params, [e.target.dataset.key!]: e.target.dataset.value })
  }
  const handlePriceButton = () =>
    setParams({ ...params, lower_price: -1, higher_price: -1 })
  const setSelectLocation = (location: string) =>
    setParams({ ...params, location })
  const debouncedOnChange = debounce(handleSetParamsValue, 500)
  const debouncedOnClick = debounce(handleSetParamsValue2, 300)

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
            <Col>
              <Typography.Title level={4}>Категории</Typography.Title>
              <List>
                {categories &&
                  categories.map((value, index) => (
                    <List.Item
                      onClick={debouncedOnClick}
                      data-key="category"
                      data-value={value.slug}
                      key={index}
                    >
                      {value.title}
                    </List.Item>
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
                  <List.Item
                    data-key="category"
                    data-value={value}
                    key={index}
                    onClick={debouncedOnClick}
                  >
                    {value}
                  </List.Item>
                ))}
              </List>
            </Col>
            <Col>
              <Typography.Title level={5}>Цена</Typography.Title>
              <div style={{ display: 'flex' }}>
                <Input
                  type="number"
                  placeholder="От"
                  name="lower_price"
                  onChange={debouncedOnChange}
                />
                <Input
                  type="number"
                  placeholder="До"
                  name="higher_price"
                  onChange={debouncedOnChange}
                />
              </div>
              <Button style={{ width: '100%' }} onClick={handlePriceButton}>
                Договорная
              </Button>
            </Col>
            <Col>
              <Typography.Title level={5}>Город/Регион</Typography.Title>
              {/* <Input
                placeholder="Весь Кыргызстан"
                name="location"
                onChange={debouncedOnChange}
              /> */}
              <Select
                className="select"
                style={{ width: '100%' }}
                placeholder="select one country"
                onChange={setSelectLocation}
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
            announ.map((value) => <Cards {...value} key={value.slug} />)}
        </Content>
      </Layout>
    </div>
  )
}
