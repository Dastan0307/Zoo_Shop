import { Card } from 'antd';
import './editPages.scss'
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import TomHoland from '../../assets/A.png'
import { Typography } from 'antd';
import { useState } from 'react';
import { PrimaryButton } from '..';


const { Text } = Typography;
    

const Password = ({ passwordCard, setPasswordCard }: any) => {
    const { payload } = useSelector((state: RootState) => setCredentials(state));
    const user = payload.auth.userInfo;
    
    const [oldPassword, setOldPassword] = useState('lego');
    const [newPassoord, setNewPassword] = useState('');
    const [confirmNewPassoord, setConfirmNewPassword] = useState('');

  return (
    <>
        {passwordCard && <div className="overlay" />}
        <div className='card'>  
            <Card className='name_card'>
            <Text className="card_title__password">Сменить пароль</Text>
            <div className="nameIps" style={{ marginTop: 30 }}>
                <Text>Старый пароль</Text>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <Text>Новый пароль</Text>
                <input type="password" value={newPassoord} onChange={(e) => setNewPassword(e.target.value)} />
                <Text>Подтверждение пароля</Text>
                <input type="password" value={confirmNewPassoord} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <PrimaryButton style={{ width: 306, height: 40, marginTop: 40, marginRight: 4 }}>Сохранить</PrimaryButton>
            <button className='btn' onClick={() => setPasswordCard(false)}>Отменить</button>
            </Card>
        </div>
    </>
  )
};

export default Password;
