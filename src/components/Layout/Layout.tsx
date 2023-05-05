import { Layout as LayoutWrapper, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '..'

type LayoutProps = {
  header?: boolean
  footer?: boolean
}

export const Layout = ({ footer = true, header = true }: LayoutProps) => {
  return (
    <motion.div
      // initial={{ opacity: 0 }} 
      // whileInView={{ opacity: 1 }}
      // transition={{ duration: 0.5 }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <LayoutWrapper>
          {header && <Header />}
          <Content>
            <Outlet />
          </Content>
          {/* {footer && <Footer />} */}
        </LayoutWrapper>
      </Space>
    </motion.div>
  )
}
