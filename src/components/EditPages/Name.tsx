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

 
const Name = ({ setNameCard, nameCard }: any) => {

  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const [name, setName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.lastName);

  return (
    <>
    {nameCard && <div className="overlay" />}
      <div className='card'>  
        <Card className='name_card'>
          <img src={TomHoland} alt="error" width={70} height={70}/>
          <Text className="card_name">{user.first_name}</Text>
          <div className="nameIps">
            <Text>Имя</Text>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Text>Фамилия</Text>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <PrimaryButton style={{ width: 306, height: 40, marginTop: 30 }}>Сохранить</PrimaryButton>
          <button className='btn' onClick={() => setNameCard(false)}>Отменить</button>
        </Card>
      </div>
    </>
  )
};

export default Name;
