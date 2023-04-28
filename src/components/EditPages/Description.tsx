import { Card } from 'antd';
import './editPages.scss'
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import { useState } from 'react';
import { PrimaryButton } from '..';
import { useTypedDispatch } from 'src/hooks';
import { changeDesc } from '@store/EditUser/editSlice';


const { Text } = Typography;

const Description = ({ setDescCard, descCard }: any) => {
  const dispatch = useTypedDispatch();
    
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const [about_user, setDesc] = useState(user.about_user);
  

  const id = user.id;
  
  

  async function handleDesc() {
    const data = await changeDesc({ about_user, id });
    setDescCard(false)
    dispatch(setCredentials(data))
  }
  

  return (
    <>
        {descCard && <div className="overlay" />}
        <div className='card'>  
            <Card className='name_card'>
            <Text className="card_title">Описание профиля</Text>
            <div className="inps">
                <Text>Описание</Text>
                <input type="text" value={about_user} onChange={(e) => setDesc(e.target.value)} className="descInp" />
            </div>
            <PrimaryButton style={{ width: 306, height: 40, marginTop: 30 }} onClick={() => handleDesc()}>Сохранить</PrimaryButton>
            <button className='btn' onClick={() => setDescCard(false)}>Отменить</button>
            </Card>
        </div>
    </>
  )
};

export default Description;
