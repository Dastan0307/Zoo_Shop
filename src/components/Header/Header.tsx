import { Header as HeaderWrapper } from 'antd/es/layout/layout';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { setCredentials } from '../../store/features/auth/authSlice';
import TomHoland from '../../assets/A.png';
import './header.scss'
import { Col, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTypedDispatch } from 'src/hooks'

import { logout } from '@store/features/auth/authSlice'

import { PrimaryButton } from '..'

const { Text } = Typography

export const Header = () => {
  const { payload } = useSelector((state: RootState) => setCredentials(state));
  const user = payload.auth.userInfo;

  const dispatch = useTypedDispatch()

  return (
    <HeaderWrapper
      style={{
        maxWidth: '100%',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to={{
        pathname: '/'
      }}>
        <Text
          style={{
            color: '#333333',
            fontSize: 24,
            fontWeight: 700,
            marginLeft: 70,
            cursor: 'pointer',
          }}
        >
          Zoo.Net
        </Text>
      </Link>
      <Col>
        <Link
          to="/about-us"
          style={{
            color: '#333333',
            border: 'none',
            background: 'transparent',
            marginRight: 65,
          }}
        >
          О нас
        </Link>
        <Link
          to="papers"
          style={{
            color: '#333333',
            border: 'none',
            background: 'transparent',
            marginRight: 55,
          }}
        >
          Статьи
        </Link>
        {
              user ? (
                <>
                  <Link to={'/login'} style={{ padding: '10px 25px', color: '#333333', marginRight: 10 }}>Сообщения</Link>
                  <Link to={'/login'} style={{ padding: '10px 25px', color: '#333333', marginRight: 10, fontSize: 14, fontWeight: 400,  }}> <img src={TomHoland} alt="error" width={40} height={40} /> {user.first_name}</Link>
                </>
              ):(
                <Link to={'/login'} style={{ padding: '10px 25px', color: '#333333', background: 'transparent', marginRight: 20, border: '1px solid #828282', borderRadius: 6 }}>Войти</Link>
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
