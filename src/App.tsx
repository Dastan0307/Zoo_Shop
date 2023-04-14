import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components'
import { AboutUs, Login, Main, Recovery, RecoveryFinish, Register } from './screens'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Oops!</div>,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
    ],
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <div>Oops!</div>,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <div>Oops!</div>,
  },
  {
    path: 'recovery',
    element: <Recovery />,
    errorElement: <div>Oops!</div>,
  },
  {
    path: 'recovery_finish',
    element: <RecoveryFinish />,
    errorElement: <div>Oops!</div>,
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}
