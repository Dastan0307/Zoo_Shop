import {
  Button,
  Card,
  Col,
  Image,
  Input,
  InputRef,
  Layout,
  List,
  Row,
  Select,
  Typography,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { motion } from 'framer-motion'
import React, { RefObject, useEffect, useRef, useState } from 'react'

import { AnnouncementApi } from '@api/AnnouncementApi'
import { CardMain, CardOrg } from '@components/index'
import { useGetCategoriesQuery } from '@store/features/category/categorySevice'
import {
  AnnouncementCardType,
  AnnouncementFilterType,
  CategoryType,
  OrganizarionType,
  OrgParams,
} from '@typess/types'
import { debounce } from '@utils/debounce'

import './main.scss'

export const Main = () => {
  const [params, setParams] = useState<AnnouncementFilterType>({})
  const [orgParams, setOrgParams] = useState<OrgParams>({})
  const [announ, setAnnoun] = useState<AnnouncementCardType[]>([])
  const [orgs, setOrgs] = useState<OrganizarionType[]>([])
  const [mainType, setMainType] = useState<'announ' | 'org'>('announ')
<<<<<<< HEAD
  const res = useGetCategoriesQuery('1').currentData
  const categories = res?.results
=======
  const res = useGetCategoriesQuery('s').currentData
  const categories = res?.results 
>>>>>>> 67aa3897c47c61999f771186a747a54670ff5ff6

  const searchInput = useRef<InputRef>(null)
  const lowerPriceInput = useRef<InputRef>(null)
  const higherPriceInput = useRef<InputRef>(null)

  const handleSetParamsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.dataset.key == 'lower_price' || e.target.dataset.key == 'lower_price') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setParams({
        ...params,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [e.target.name]: +e.target.dataset.value!,
      })
    }
    setParams({ ...params, [e.target.name]: e.target.value })
  }
  const handleSetParamsValue2 = (value: CategoryType) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setParams({ ...params, category: value.slug })
  }
  const cleanParams = (
    searchInput: RefObject<InputRef>,
    lowerPriceInput: RefObject<InputRef>,
    higherPriceInput: RefObject<InputRef>,
  ) => {
    setParams({})
  }
  const handlePriceButton = () => {
    setParams({ ...params, lower_price: '-1', higher_price: '-1' })
  }
  console.log(params)

  useEffect(() => {
    const getData = async () => {
      const data = await AnnouncementApi.getAnnouncement(params)
      if (data?.data) {
        setAnnoun(data?.data)
      }
    }
    getData()
  }, [params])

  useEffect(() => {
    const getData = async () => {
      const data = await AnnouncementApi.getOrganization(params)
      if (data?.data) {
        setOrgs(data?.data.results)
      }
    }
    getData()
  }, [])

  const setSelectLocation = (location: string) => setParams({ ...params, location })
  const debouncedOnChange = debounce(handleSetParamsValue, 500)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="main"
    >
      <Input
        placeholder="Поиск"
        ref={searchInput}
        onChange={(e) =>
          mainType == 'org'
            ? setOrgParams({ ...orgParams, search: e.target.value })
            : debouncedOnChange(e)
        }
        name="search"
      />
      <Row className="main_type_wrapper">
        <Col span={12}>
          <Card
            className="main_type"
            onClick={() => {
              setMainType('announ')
            }}
          >
            <Typography.Title level={3}>Питомцы</Typography.Title>
            <Typography.Text>Выберите питомца по душе</Typography.Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            className="main_type_2"
            onClick={() => {
              setMainType('org')
            }}
          >
            <Typography.Title level={3}>Организации</Typography.Title>
            <Typography.Text>
              Ветеринарные клиники, <br /> зоомагазины и приюты
            </Typography.Text>
          </Card>
        </Col>
      </Row>
      <Layout style={{ display: 'flex', gap: '30px' }}>
        <Sider className="sideBar">
          {mainType == 'announ' ? (
            <Row>
              <Col style={{ width: '100%' }}>
                <Row className="sideBar_title">
                  <div>
                    <Typography.Title level={4}>Категории</Typography.Title>
                  </div>
                  <Typography.Text
                    onClick={() =>
                      cleanParams(searchInput, lowerPriceInput, higherPriceInput)
                    }
                  >
                    Очистить
                  </Typography.Text>
                </Row>
                <List>
                  {categories &&
                    categories.map((value, index) => (
                      <List.Item
                        className="category_list_item active"
                        style={{ border: 'none' }}
                        onClick={() => handleSetParamsValue2(value)}
                        key={index}
                      >
                        <span
                          style={{
                            color: params.category == value.slug ? '#96e7b7' : '#333333',
                          }}
                        >
                          {value.title}
                        </span>
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
                    ref={lowerPriceInput}
                    onChange={debouncedOnChange}
                  />
                  <Input
                    type="number"
                    style={{ height: '42px' }}
                    placeholder="До"
                    name="higher_price"
                    ref={higherPriceInput}
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
          ) : (
            <Row>
              <Col>
                <Typography.Title level={5}>Категории</Typography.Title>
                <List>
                  {categories &&
                    [
                      'Ветеринарные клиники',
                      'Зоомагазины',
                      'Хостелы/приюты',
                      'Зооняни',
                    ].map((value, index) => (
                      <List.Item
                        className="category_list_item active"
                        style={{ border: 'none' }}
                        onClick={(e) => setOrgParams({ ...orgParams, category: value })}
                        key={index}
                      >
                        <span>{value}</span>
                      </List.Item>
                    ))}
                </List>
              </Col>
              <Col>
                <Typography.Title level={5}>Местоположение</Typography.Title>
                <Select
                  className="select"
                  style={{ width: '100%' }}
                  size={'large'}
                  placeholder="Весь Кыргызстан"
                  onChange={(value) => setOrgParams({ ...orgParams, location: value })}
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
          )}
        </Sider>
        <Content className="main-content">
          {mainType == 'announ' ? (
            announ && announ[0] ? (
              announ.map((value) => (
                <CardMain key={value.slug} value={value} type="main" />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Typography.Title level={4}>
                  <Image src="/noData.png.png" width={100} /> нет результатов(
                </Typography.Title>
              </motion.div>
            )
          ) : (
            orgs && orgs.map((value) => <CardOrg key={value.id} {...value} />)
          )}
        </Content>
      </Layout>
    </motion.div>
  )
}
