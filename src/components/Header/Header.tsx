import { Header as HeaderWrapper } from 'antd/es/layout/layout';
import { RootState } from '../../store/store';
import TomHoland from '../../assets/A.png';
import { Col, Image, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { PrimaryButton } from '..'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useTypedSelector } from 'src/hooks';
import like from '../../assets/like.png'
import './header.scss'
import { API_URL } from '@api/index';

const { Text } = Typography

export const Header = () => {
  const [nav, setNav] = useState<boolean>(false)
  const { userInfo } = useTypedSelector((state: RootState) => state.auth)
  const user = userInfo
  
  console.log(user);
  
  const [menu, setMenu] = useState(true);
  const header = menu ? "header header_close" : "header"

  return (
    <HeaderWrapper className={header}>
      <Link
        className='header__logo'
        to='/'
      >
        Zoo.Net
      </Link>
      <Col className={nav ? 'header__list active' : 'header__list'}>
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
              <Link to={'/favorites'} className='header__link-ms_inside'>Избранные</Link>

              <Link to={'/profile'} className='header__link-nm_inside'> <Image style={{borderRadius: '100%'}}  preview={false}  src={user.image ? user.image : TomHoland } alt="error" width={40} height={40} /> {user.first_name}</Link>
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
      <Col onClick={() => setNav(!nav)} className='mobile-btn'>
        {nav ? <CloseOutlined className='menu-icon'/> : <MenuOutlined className='menu-icon' />}
      </Col>
      
    </HeaderWrapper>
  )
}


//   const [menu, setMenu] = useState(true)

//   return (
//     <HeaderWrapper className="header">
//       <Text className="header__logo" onClick={() => navigate('/')}>
//         Zoo.Net
//       </Text>
//       <Col className="header__list">
//         <Link to="/about-us" className="header__link">
//           О нас
//         </Link>
//         <Link to="papers" className="header__link">
//           Статьи
//         </Link>
//         {user ? (
//           <>
//             <Link to={'/chats'} className="header__link-ms_inside">
//               Сообщения
//             </Link>
//             <Link to={'/profile'} className="header__link-nm_inside">
//               {' '}
//               <img src={TomHoland} alt="error" width={40} height={40} /> {user.first_name}
//             </Link>
//           </>
//         ) : (
//           <Link to={'/login'} className="header__link-avatar_inside">
//             Войти
//           </Link>
//         )}
//         <Link
//           to={{
//             pathname: '/new-announcement',
//           }}
//         >
//           <PrimaryButton
//             style={{ color: '#FFFFFF', width: 212, height: 40, marginRight: 80 }}
//           >
//             Новое объявление
//           </PrimaryButton>
//         </Link>
//       </Col>
//       {/* адаптация для мобильных  */}
//       {menu ? (
//         <MenuOutlined onClick={() => setMenu(!menu)} className="nav__menu_icon" />
//       ) : (
//         <>
//           <div className="nav_line"></div>
//           <CloseOutlined
//             onClick={() => setMenu(!menu)}
//             className="nav__menu_icon-close"
//           />
//           <Col className="nav__menu">
//             <Link to="/about-us" className="header__link">
//               О нас
//             </Link>
//             <Link to="papers" className="header__link">
//               Статьи
//             </Link>
//             {user ? (
//               <>
//                 <Link to={'/chats'} className="header__link-ms_inside">
//                   Сообщения
//                 </Link>
//                 <Link to={'/profile'} className="header__link-nm_inside">
//                   {' '}
//                   <img src={TomHoland} alt="error" width={40} height={40} />{' '}
//                   {user.first_name}
//                 </Link>
//               </>
//             ) : (
//               <Link to={'/login'} className="nav-avatar_inside-menu">
//                 Войти
//               </Link>
//             )}
//             <Link
//               to={{
//                 pathname: '/new-announcement',
//               }}
//             >
//               <PrimaryButton className="nav__btn">Новое объявление</PrimaryButton>
//             </Link>
//           </Col>
//         </>
//       )}
//     </HeaderWrapper>
//   )
// }
