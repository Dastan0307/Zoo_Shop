import { Header as HeaderWrapper } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

export const Header = () => {
  return <HeaderWrapper>
    <Link to={'/register'}>register</Link>
    <Link to={'/login'}>login</Link>
  </HeaderWrapper>
}
