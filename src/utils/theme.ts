import { ThemeConfig } from 'antd'

export const theme: ThemeConfig = {
  token: {
    fontFamily: 'Montserrat, sans-serif',
    colorPrimary: '#FFD02b',
    colorSuccess: '#FFD02b',
    colorPrimaryBg: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgBase: '#fff',
    colorBgLayout: '#fff',
    fontSizeHeading1: 96,
    fontSizeHeading2: 48,
    fontSizeHeading3: 24,
    fontSizeHeading4: 24,
    fontSizeHeading5: 18,
    fontSize: 14,
    borderRadius: 6,
  },
  components: {
    Button: {
      fontSize: 16,
    },
    Card: {
      boxShadow: '0px 2px 17px rgba(0, 0, 0, 0.1)',
      boxShadowSecondary: '0px 2px 17px rgba(0, 0, 0, 0.1)',
      boxShadowTertiary: '0px 2px 17px rgba(0, 0, 0, 0.1)',
    },
    Input: {
      borderRadius: 6,
    },
    Image:{
      borderRadius: 6
    }
  },
}
