import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components'
import { AboutUs, Main, Register, Announcements } from './screens'
import NewAnnouncement from '@screens/Announcements/NewAnnouncement/NewAnnouncement'

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
        path: '/announcement',
        element: <Announcements />,
      },
      {
        path: '/newannouncement',
        element: <NewAnnouncement />,
      },
    ],
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <div>Oops!</div>,
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
