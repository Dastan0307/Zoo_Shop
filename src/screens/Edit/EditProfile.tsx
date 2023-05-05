import {
  Button,
  Card,
  Col,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Typography,
} from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useTypedSelector } from 'src/hooks'

import Description from '@components/EditPages/Description'
import Name from '@components/EditPages/Name'
import Password from '@components/EditPages/Password'
import { postAdress } from '@store/features/postAdres/postSlice'

import avatar from '../../assets/A.png'
import { setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

import './editProfile.scss'

const { Title, Text } = Typography

const EditProfile = () => {
  const { userInfo } = useTypedSelector((state) => state.auth)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = userInfo!

  const [nameCard, setNameCard] = useState(false)
  const [passwordCard, setPasswordCard] = useState(false)
  const [descCard, setDescCard] = useState(false)

  // const [params, setParams] = useState<AnnouncementFilterType>({})
  const [phone_number, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [adressType, setAdressType] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>()
  const [location, setLocation] = useState('')
  const [accessBtn, setAccessBtn] = useState(false)
  const setSelectLocation = (location: string) => setLocation(location)
  const setSelectType = (type: RadioChangeEvent) => {
    setAdressType(type.target.value)
  }

  const id = user.id

  async function postBtn() {
    setAccessBtn(true)
    const data = await postAdress({
      adress,
      adress_type: adressType,
      title,
      image,
      phone_number,
      location,
      id,
    })
    if (data?.status == 201) {
      setPhone('')
      setAdress('')
      setAdressType('')
      setTitle('')
      setImage(null)
      setLocation('')
    }
    await setAccessBtn(false)
  }

  return (
    <Col xs={24} md={12}>
      <div className="edit">
        <div className="personal_data">
          <Row gutter={[16, 18]}>
            <Col className="gutter-row" span={24} style={{ marginBottom: 25 }}>
              <Text className="main__title">Личные данные</Text>
            </Col>
            <Col className="gutter-row" span={24}>
              <div className="gutter-row_right">
                <span className="gutter_title"> Профиль</span>{' '}
                <span>
                  {user?.first_name} {user?.last_name}
                </span>{' '}
              </div>{' '}
              <Button onClick={() => setNameCard(true)}>Изменить</Button>
            </Col>
            <Col className="gutter-row" span={24}>
              <div className="gutter-row_right">
                <span className="gutter_title"> Описание </span>
                <span className='paragraph2' >{user.about_user}</span>{' '}
              </div>
              <Button onClick={() => setDescCard(true)}>Изменить</Button>
            </Col>
            <Col className="gutter-row" span={24}>
              <div className="gutter-row_right">
                <span className="gutter_title"> Пароль</span> <div>✱✱✱✱✱✱✱✱✱✱</div>
              </div>
              <Button onClick={() => setPasswordCard(true)}>Изменить</Button>
            </Col>
          </Row>
        </div>
        <div className="adress">
          <Row className="gutter-row" style={{ margin: '70px 0px 17px 0px' }}>
            <Text className="main__title">Добавить адрес</Text>
          </Row>
          {/* <Row className="address_gutter_wrapper">
            <Col xs={12} md={24} className="adress_gutter_type">
              <input
                type="radio"
                value="Хостелы/приюты"
                onChange={(e) => setSelectType(e.target.value)} 
                id="type1"
              />
              <Text className="address_gutter_list"> Хостелы/приюты</Text>
            </Col>
            <Col xs={12} md={24} className="adress_gutter_type">
              <input type="radio" id="type1" 
              onChange={(e) => setSelectType(e.target.value)} value="Зоомагазины" />
              <Text className="address_gutter_list"> Зоомагазины</Text>
            </Col>
            <Col xs={12} md={24} className="adress_gutter_type">
              <input type="radio" id="type1"
              onChange={(e) => setSelectType(e.target.value)}  value="Ветклиники" />
              <Text className="address_gutter_list"> Ветклиники</Text>
            </Col>
            <Col xs={12} md={24} className="adress_gutter_type">
              <input type="radio" id="type1"
              onChange={(e) => setSelectType(e.target.value)}  value="Зооняни" />
              <Text className="address_gutter_list"> Зооняни</Text>
            </Col>
          </Row> */}
          <Row>
            <Radio.Group name="radiogroup" onChange={setSelectType} defaultValue={1}>
              <Radio value={'hostel'}>Хостелы/приюты</Radio>
              <Radio value={'zooshop'}>Зоомагазины</Radio>
              <Radio value={'clinic'}>Ветклиники</Radio>
              <Radio value={'babysitter'}>Зооняни</Radio>
            </Radio.Group>
          </Row>
        </div>
        <div className="choice_place">
          <Text>Местоположение</Text>
          <div className="place">
            <Col className="inp" xs={24}>
              <Select
                style={{ width: '100%', flex: '1' }}
                size={'large'}
                placeholder="Весь Кыргызстан"
                onChange={setSelectLocation}
                optionLabelProp="label"
                bordered={false}
              >
                <Select.Option value={'Бишкек'}>Бишкек</Select.Option>
                <Select.Option value={'Ош'}>Ош</Select.Option>
                <Select.Option value={'Нарын'}>Нарын</Select.Option>
                <Select.Option value={'Иссык-Куль'}>Иссык-Куль</Select.Option>
                <Select.Option value={'Баткен'}>Баткен</Select.Option>
                <Select.Option value={'Джалал-Абад'}>Джалал-Абад</Select.Option>
              </Select>
            </Col>
          </div>
          <Input
            placeholder=" Номер"
            className="inpNum"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder=" Название"
            className="inpNum"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder=" Адресс"
            className="inpNum"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <Input
            bordered={false}
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <div className="editProfile_wrapper_btn">
            <button disabled={accessBtn} className="btn" onClick={() => postBtn()}>
              Подтвердить
            </button>
          </div>
        </div>
      </div>
      <>
        {nameCard ? (
          <Name setNameCard={setNameCard} nameCard={nameCard} />
        ) : '' || descCard ? (
          <Description setDescCard={setDescCard} descCard={descCard} />
        ) : '' || passwordCard ? (
          <Password setPasswordCard={setPasswordCard} passwordCard={passwordCard} />
        ) : (
          ''
        )}
      </>
    </Col>
  )
}

export default EditProfile
