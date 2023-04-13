import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components'
import { AboutUs, Main, Register, ProfilePage } from './screens'

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
      {
        path: 'profile',
        element: <ProfilePage />,
      }
    ],
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <div>Oops!</div>,
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}
