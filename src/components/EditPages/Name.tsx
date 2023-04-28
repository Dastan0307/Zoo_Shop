import { Card } from 'antd';
import './editPages.scss'
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import TomHoland from '../../assets/A.png'
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '..';
import { changeName } from '@store/EditUser/editSlice';
import { useTypedDispatch } from 'src/hooks';


const { Text } = Typography;

 
const Name = ({ setNameCard, nameCard }: any) => {
  const dispatch = useTypedDispatch();

  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const [first_name, setName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  

  const id = user.id;
  

  function handleName() {
    changeName({first_name, last_name, id});
    setNameCard(false)
  }



  return (
    <>
    {nameCard && <div className="overlay" />}
      <div className='card'>  
        <Card className='name_card'>
          <img src={TomHoland} alt="error" width={70} height={70}/>
          <Text className="card_name">{user.first_name}</Text>
          <div className="nameIps">
            <Text>Имя</Text>
            <input type="text" value={first_name} onChange={(e) => setName(e.target.value)} />
            <Text>Фамилия</Text>
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
          </div>
            <PrimaryButton style={{ width: 306, height: 40, marginTop: 30 }} onClick={handleName}>Сохранить</PrimaryButton>
            <button 
              className='btn' 
              onClick={() => setNameCard(false)}
              >Отменить
            </button>
        </Card>
      </div>
    </>
  )
};

export default Name;
