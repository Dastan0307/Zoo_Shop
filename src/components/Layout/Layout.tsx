import { Layout as LayoutWrapper, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '..'

export const Layout = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <LayoutWrapper>
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </LayoutWrapper>
    </Space>
  )
}
