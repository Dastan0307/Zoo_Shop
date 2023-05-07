import { Card, Input, Modal, Row, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from 'src/hooks'

import { changeDesc } from '@store/EditUser/editSlice'

import { PrimaryButton } from '..'
import { setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

import './editPages.scss'
import Paragraph from 'antd/es/skeleton/Paragraph'

const { Text } = Typography

const Description = ({ setDescCard, descCard }: any) => {
  const dispatch = useTypedDispatch()

  const { userInfo } = useSelector((state: RootState) => state.auth)
  const user = userInfo!

  const [about_user, setDesc] = useState(user.about_user)

  const id = user.id

  async function handleDesc() {
    const data = await changeDesc({ about_user, id })
    setDescCard(false)
    dispatch(setCredentials(data))
  }

  return (
    <Modal
      open={descCard}
      onCancel={() => setDescCard(false)}
      cancelButtonProps={{ hidden: true }}
      closable={false}
      okButtonProps={{ hidden: true }}
      style={{ maxWidth: '336px' }}
      footer={false}
    >
          <Typography.Paragraph style={{textAlign: 'center'}}  className="card_title">Описание профиля</Typography.Paragraph>
          <div className="inps">
            <Text>Описание</Text>
            <Input.TextArea
              value={about_user}
              onChange={(e) => setDesc(e.target.value)}
              style={{
                minHeight: '180px',
                fontSize: '14px',
                color: '#333333',
                fontWeight: '300',
              }}
            ></Input.TextArea>
          </div>
          <PrimaryButton
            style={{ width: '100%', height: 40, marginTop: 30 }}
            onClick={() => handleDesc()}
          >
            Сохранить
          </PrimaryButton>
          <Row justify={'center'}>
            <Typography.Paragraph style={{marginTop: '20px', marginBottom: 0, cursor: 'pointer' }}  className="btn" onClick={() => setDescCard(false)}>
              Отменить
            </Typography.Paragraph>
          </Row>
    </Modal>
  )
}

export default Description
