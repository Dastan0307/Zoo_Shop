import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'

import { Layout } from './components'
import {
  AboutUs,
  Login,
  Main,
  ProfilePage,
  Recovery,
  RecoveryFinish,
  Register,
} from './screens'

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/recovery_finish" element={<RecoveryFinish />} />
    </Routes>
  )
}
