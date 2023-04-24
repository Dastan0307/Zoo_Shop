import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@store/store'
import { theme } from '@utils/theme'

import { App } from './App'

import 'antd/dist/reset.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={false} persistor={persistor}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
)
