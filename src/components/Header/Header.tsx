import { Header as HeaderWrapper } from 'antd/es/layout/layout';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { setCredentials } from '../../store/features/auth/authSlice';
import TomHoland from '../../assets/A.png';
import './header.scss'
import { Col, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTypedDispatch } from 'src/hooks'

import { logout } from '@store/features/auth/authSlice'

import { PrimaryButton } from '..'

const { Text } = Typography

export const Header = () => {
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  return (
    <HeaderWrapper className='header'>
      <Text
        className='header__logo'
        onClick={() => navigate('/')}
      >
        Zoo.Net
      </Text>
      <Col className='header__list'>
        <Link
          to="/about-us"
          className='header__link'
        >
          О нас
        </Link>
        <Link
          to="papers"
          className='header__link'
        >
          Статьи
        </Link>
        {
          user ? (
            <>
              <Link to={'/chats'} className='header__link-ms_inside'>Сообщения</Link>
              <Link to={'/profile'} className='header__link-nm_inside'> <img src={TomHoland} alt="error" width={40} height={40} /> {user.first_name}</Link>
            </>
            ):(
              <Link to={'/login'} className='header__link-avatar_inside'>Войти</Link>
            )
            }
        <Link
          to={{
            pathname: '/new-announcement'
          }}
        >
          <PrimaryButton
            style={{ color: '#FFFFFF', width: 212, height: 40, marginRight: 80 }}
          >
            Новое объявление
          </PrimaryButton>
        </Link>
      </Col>
    </HeaderWrapper>
  )
}
