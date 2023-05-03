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
import { color, motion } from 'framer-motion'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { CloseOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
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
  const [mobile, setMobile] = useState<boolean>(true)

  const MobileQuery = useMediaQuery({ query: '(max-width:800px)' })

  const [mainType, setMainType] = useState<'announ' | 'org'>('announ')
  const res = useGetCategoriesQuery('1').currentData
  const categories = res?.results

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
  const cleanParams = () => {
    setParams({})
  }
  const handlePriceButton = () => {
    setParams({ ...params, lower_price: '-1', higher_price: '-1' })
  }

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
      const data = await AnnouncementApi.getOrganization(orgParams)
      if (data?.data) {
        setOrgs(data?.data.results)
      }
    }
    getData()
  }, [orgParams])

  useEffect(() => {
    if (!MobileQuery) {
      setMobile(true)
    }
  }, [MobileQuery])

  const setSelectLocation = (location: string) => setParams({ ...params, location })
  const debouncedOnChange = debounce(handleSetParamsValue, 500)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="main"
    >
      <Row className="main_wrapper-search">
        <Input
          placeholder="Поиск"
          className="main_search"
          ref={searchInput}
          onChange={(e) =>
            mainType == 'org'
              ? setOrgParams({ ...orgParams, search: e.target.value })
              : debouncedOnChange(e)
          }
          name="search"
        />
      </Row>
      {MobileQuery ? (
        <Row justify={'center'}>
          <div className="main_type_mobile">
            <Typography.Text
              style={{
                fontSize: '22px',
                color: mainType == 'announ' ? '#FFD02b' : '#333333',
              }}
              onClick={() => {
                setMainType('announ')
              }}
            >
              Питомцы
            </Typography.Text>
            <Typography.Text style={{ fontSize: '18px', padding: ' 0 15px' }}>
              |
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: '22px',
                color: mainType == 'org' ? '#FFD02b' : '#333333',
              }}
              onClick={() => {
                setMainType('org')
              }}
            >
              Организации
            </Typography.Text>
          </div>
        </Row>
      ) : (
        <Row className="main_type_wrapper">
          <Col md={12} xs={24}>
            <Card
              className="main_type"
              onClick={() => {
                setMainType('announ')
              }}
            >
              <Typography.Title level={3}>Питомцы</Typography.Title>
              <Typography.Text className="main_type_text">
                Выберите питомца по душе
              </Typography.Text>
            </Card>
          </Col>
          <Col md={12} xs={24}>
            <Card
              className="main_type_2"
              onClick={() => {
                setMainType('org')
              }}
            >
              <Typography.Title level={3}>Организации</Typography.Title>
              <Typography.Text className="main_type_text">
                Ветеринарные клиники, <br /> зоомагазины и приюты
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      )}
      <Row className="close_btn" onClick={() => setMobile(!mobile)}>
        {' '}
        {mobile ? (
          <CloseOutlined style={{ fontSize: 20 }} />
        ) : (
          <MenuOutlined style={{ fontSize: 20 }} />
        )}{' '}
      </Row>
      <Layout style={{ display: 'flex', gap: '30px', overflow: 'hidden' }}>
        <Sider className="sideBar" style={{ left: mobile ? '0%' : '-100%' }}>
          {mainType == 'announ' ? (
            <Row>
              <Col style={{ width: '100%' }}>
                <Row className="sideBar_title">
                  <div>
                    <Typography.Title level={4}>Категории</Typography.Title>
                  </div>
                  <Typography.Text onClick={() => cleanParams()}>
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
                            color: params.category == value.slug ? '#FFD02b' : '#333333',
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
            <Row className="sideBar_org">
              <Col>
                <Typography.Title level={4}>Категории</Typography.Title>
                <List>
                  {categories &&
                    [
                      { title: 'Ветеринарные клиники', slug: 'clinic' },
                      { title: 'Зоомагазины', slug: 'zooshop' },
                      { title: 'Хостелы/приюты', slug: 'hostel' },
                      { title: 'Зооняни', slug: 'babysitter' },
                    ].map((value, index) => (
                      <List.Item
                        className="category_list_item active"
                        style={{ border: 'none' }}
                        onClick={(e) =>
                          setOrgParams({ ...orgParams, adress_type: value.slug })
                        }
                        key={index}
                      >
                        <span
                          style={{
                            color:
                              orgParams.adress_type == value.slug ? '#96e7b7' : '#333333',
                          }}
                        >
                          {value.title}
                        </span>
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
                  <Select.Option value={'Иссык-куль'}>Иссык-Куль</Select.Option>
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
