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

const Description = ({ setDescCard, descCard }: any) => {
    
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const [name, setName] = useState(user.about_user);

  return (
    <>
        {descCard && <div className="overlay" />}
        <div className='card'>  
            <Card className='name_card'>
            <Text className="card_title">Описание профиля</Text>
            <div className="inps">
                <Text>Описание</Text>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="descInp" />
            </div>
            <PrimaryButton style={{ width: 306, height: 40, marginTop: 30 }}>Сохранить</PrimaryButton>
            <button className='btn' onClick={() => setDescCard(false)}>Отменить</button>
            </Card>
        </div>
    </>
  )
};

export default Description;
