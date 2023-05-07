import { Card, Modal } from 'antd'

import './editPages.scss'

import { Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from 'src/hooks'

import { changePassword } from '@store/EditUser/editSlice'

import { PrimaryButton } from '..'
import { setCredentials } from '../../store/features/auth/authSlice'
import { RootState } from '../../store/store'

const { Text } = Typography

const Password = ({ passwordCard, setPasswordCard }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const user = userInfo!

  const dispatch = useTypedDispatch()

  const [old_password, setOldPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [new_password_confirm, setConfirmNewPassword] = useState('')

  const handleSubmit = () => {
    changePassword({ old_password, new_password, new_password_confirm })
    setPasswordCard(false)
  }

  return (
    <Modal
      open={passwordCard}
      onCancel={() => setPasswordCard(false)}
      cancelButtonProps={{ hidden: true }}
      closable={false}
      okButtonProps={{ hidden: true }}
      style={{ maxWidth: '336px' }}
      footer={false}
    >
      <Typography.Paragraph
        style={{ textAlign: 'center' }}
        className="card_title__password"
      >
        Сменить пароль
      </Typography.Paragraph>
      <div className="nameIps" style={{ marginTop: 30 }}>
        <Text>Старый пароль</Text>
        <input
          type="password"
          value={old_password}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Text>Новый пароль</Text>
        <input
          type="password"
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Text>Подтверждение пароля</Text>
        <input
          type="password"
          value={new_password_confirm}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <PrimaryButton
        style={{ width: '100%', height: 40, marginTop: 40, marginRight: 4 }}
        onClick={() => handleSubmit()}
      >
        Сохранить
      </PrimaryButton>
      <Typography.Paragraph
        style={{ marginTop: ' 20px', marginBottom: '0', cursor: 'pointer', textAlign: 'center' }}
        className="btn"
        onClick={() => setPasswordCard(false)}
      >
        Отменить
      </Typography.Paragraph>
    </Modal>
  )
}

export default Password
