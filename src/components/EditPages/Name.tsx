import { Card, Col, Image, Input, Modal, Row, Typography } from 'antd'
import Paragraph from 'antd/es/skeleton/Paragraph'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { changeName } from '@store/EditUser/editSlice'

import TomHoland from '../../assets/A.png'
import { setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'
import { PrimaryButton } from '..'

import './editPages.scss'

const { Text } = Typography

const Name = ({ setNameCard, nameCard }: any) => {
  const dispatch = useTypedDispatch()
  const { userInfo } = useTypedSelector((state) => state.auth)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = userInfo!

  const [first_name, setName] = useState<string>(user.first_name ? user.first_name : '')
  const [last_name, setLastName] = useState<string>(user.last_name ? user.last_name : '')
  const [photo, setPhoto] = useState<FileList | null>(null)
  const id = user.id

  async function handleName() {
    const formData = new FormData()
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    if (photo?.length) {
      formData.append('image', photo[0])
    }
    const data = await changeName(formData, id)
    setNameCard(false)
    dispatch(setCredentials(data))
  }

  return (
    <Modal
      open={nameCard}
      onCancel={() => setNameCard(false)}
      cancelButtonProps={{ hidden: true }}
      closable={false}
      okButtonProps={{ hidden: true }}
      style={{ maxWidth: '336px' }}
      footer={false}
    >
      <Input bordered={false} type="file" onChange={(e) => setPhoto(e.currentTarget.files)} />
      <Row justify={'center'}>
        <Col style={{textAlign: 'center'}} >
          <Image style={{borderRadius: '100%'}}  src={userInfo?.image} alt="error" width={70} height={70} />
          <Typography.Paragraph className="card_name">
            {user.first_name}
          </Typography.Paragraph>
        </Col>
      </Row>
      <div className="nameIps">
        <Text>Имя</Text>
        <input type="text" value={first_name} onChange={(e) => setName(e.target.value)} />
        <Text>Фамилия</Text>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <PrimaryButton
        style={{ width: '100%', height: 40, marginTop: 30 }}
        onClick={handleName}
      >
        Сохранить
      </PrimaryButton>
      <Row justify={'center'} >
        <Typography.Paragraph
          style={{ textAlign: 'center', marginTop: '20px', marginBottom: '0', cursor: 'pointer' }}
          className="btn"
          onClick={() => setNameCard(false)}
        >
          Отменить
        </Typography.Paragraph>
      </Row>
    </Modal>
  )
}

export default Name
