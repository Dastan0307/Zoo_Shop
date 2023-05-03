import { Card } from 'antd';
import './editPages.scss'
import { Typography } from 'antd';
import { useState } from 'react';
import { PrimaryButton } from '..';
import { changePassword } from '@store/EditUser/editSlice';
import { useTypedDispatch } from 'src/hooks';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { setCredentials } from '../../store/features/auth/authSlice';


const { Text } = Typography;

const Password = ({ passwordCard, setPasswordCard }: any) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const user = userInfo!

    const dispatch = useTypedDispatch();

    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password_confirm, setConfirmNewPassword] = useState('');

    

    const handleSubmit = () => {
      changePassword({ old_password, new_password, new_password_confirm });
      setPasswordCard(false)
    };

  return (
    <>
        {passwordCard && <div className="overlay" />}
        <div className='card'>  
            <Card className='name_card'>
            <Text className="card_title__password">Сменить пароль</Text>
            <div className="nameIps" style={{ marginTop: 30 }}>
                <Text>Старый пароль</Text>
                <input type="password" value={old_password} onChange={(e) => setOldPassword(e.target.value)} />
                <Text>Новый пароль</Text>
                <input type="password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
                <Text>Подтверждение пароля</Text>
                <input type="password" value={new_password_confirm} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <PrimaryButton style={{ width: 306, height: 40, marginTop: 40, marginRight: 4 }} onClick={() => handleSubmit()}>Сохранить</PrimaryButton>
            <button className='btn' onClick={() => setPasswordCard(false)}>Отменить</button>
            </Card>
        </div>
    </>
  )
};

export default Password;
