import { useState } from 'react';
import { Button, Card, Col, Row, Typography, Input, Select } from 'antd';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/A.png';
import { setCredentials } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import './editProfile.scss'
import Name from '@components/EditPages/Name';
import Description from '@components/EditPages/Description';
import Password from '@components/EditPages/Password';
import { AnnouncementFilterType } from '@typess/types';
import { postAdress } from '@store/features/postAdres/postSlice';
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;

const EditProfile = () => {
    const { payload } = useSelector((state: RootState) => setCredentials(state));
    const user = payload.auth.userInfo;

    const [nameCard, setNameCard] = useState(false);
    const [passwordCard, setPasswordCard] = useState(false);
    const [descCard, setDescCard] = useState(false);

    const [place, setPlace] = useState(false);

    const [params, setParams] = useState<AnnouncementFilterType>({})
    const [phone_number, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState({});
    

    const setSelectLocation = (location: string) => setParams({ ...params, location })


    const location = params.location
    
    
    const id = user.id

    // fake 
    const adress_type = 'hostel'
    const verified_adress = true
    
    

    function postBtn() {
        postAdress({ adress, adress_type, verified_adress, title, image,  phone_number, location, id })
    }
    


  return (
      <div style={{ maxWidth: '100%', margin: '0 auto' , background: 'white', display: 'flex', justifyContent: 'center', paddingTop: 40, paddingBottom: 250, position: 'relative' }}>
        <Row>
            <Col span={8}>
                <Card
                hoverable
                style={{ width: 275, border: 'none', marginRight: 180 }}
                >
                <img alt="example" src={avatar} style={{ width: 100, height: 100, borderRadius: 90, marginBottom: 5 }} />
                <Title level={4}>{user?.first_name}. {user?.last_name}</Title>

                <Text type="secondary">{user?.location}</Text>
                <Text style={{ width: 275, display: 'block' ,marginTop: 20 }}>{user?.about_user}</Text>
                
                <Row gutter={[20, 20]} style={{marginTop: 30}} className='links'>
                    <Col span={24}>
                    <NavLink to="/profile" >Мои объявления</NavLink>
                    </Col>
                    <Col span={24}>
                    <NavLink to="/edit-profile">Редактирование</NavLink>
                    </Col>
                    <Col span={24}>
                    <NavLink to='/' >Новое объявление</NavLink>
                    </Col>
                    <Col span={24}>
                    <NavLink to='/' >Выход</NavLink>
                    </Col>
                </Row>
                </Card>
            </Col>
            <div className='line'></div>
            <div className="edit">
                <div className='personal_data'>
                    <Row gutter={[16, 18]}>
                        <Col className="gutter-row" span={24} style={{ marginBottom: 25 }}>
                            <Text className='main__title'>Личные данные</Text>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>Профиль</div>
                        </Col>
                        <Col className="gutter-row" span={13}>
                            <div>{user?.first_name}</div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Button onClick={() => setNameCard(true)}>Изменить</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>Описание</div>
                        </Col>
                        <Col className="gutter-row" span={13}>
                            <div>Lorem Ipsum is simply dummy text of th...</div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Button onClick={() => setDescCard(true)}>Изменить</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>Пароль</div>
                        </Col>
                        <Col className="gutter-row" span={13}>
                            <div>✱✱✱✱✱✱✱✱✱✱</div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Button onClick={() => setPasswordCard(true)}>Изменить</Button>
                        </Col>
                    </Row>
                </div>
                <div className="adress">
                    <Row gutter={[16, 18]}>
                        <Col className="gutter-row" span={24} style={{ margin: '70px 0px 17px 0px' }}>
                            <Text className='main__title'>Добавить адрес</Text>
                        </Col>
                        <Col span={24}>
                            <input type="checkbox" value="Хостелы/приюты" onChange={() => setPlace(!place)} />
                            <Text className='list'> Хостелы/приюты</Text>
                        </Col>
                        <Col span={24}>
                            <input type="checkbox" value="Зоомагазины" />
                            <Text className='list'> Зоомагазины</Text>
                        </Col>
                        <Col span={24}>
                            <input type="checkbox" value="Ветклиники" />
                            <Text className='list'> Ветклиники</Text>
                        </Col>
                        <Col span={24}>
                            <input type="checkbox" value="Зооняни" />
                            <Text className='list'> Зооняни</Text>
                        </Col>
                    </Row>
                </div>
                <div className="choice_place">
                    <Text>Местоположение</Text>
                    <div className="place">
                        <Col className="inp">
                            <Select
                            style={{ width: '100%' }}
                            size={'large'}
                            placeholder="Весь Кыргызстан"
                            onChange={setSelectLocation}
                            optionLabelProp="label"
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
                            className='inpNum'
                            value={phone_number}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            placeholder=" Название"
                            className='inpNum'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            placeholder=" Адресс"
                            className='inpNum'
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />
                        <button className='btn' onClick={() => postBtn()}>Подтвердить</button>
                </div>
            </div>
        </Row>
        <>
            {
                nameCard ? (
                    <Name setNameCard={setNameCard} nameCard={nameCard} />
                ):(
                    ""
                )
                ||
                descCard ? (
                    <Description setDescCard={setDescCard} descCard={descCard} />
                ):(
                    ""
                )
                ||
                passwordCard ? (
                    <Password setPasswordCard={setPasswordCard} passwordCard={passwordCard} />
                ):(
                    ""
                )
            }
        </>
    </div>
  )
};

export default EditProfile;
