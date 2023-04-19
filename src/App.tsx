import { AnimatePresence } from 'framer-motion'
import {
  Route,
  Routes,
  useLocation,
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
  Announcements,
  NewAnnouncement,
  EditAnnouncement,
  Papers,
  Paper,
} from './screens'

export const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/announcement" element={<Announcements />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />
          <Route path='/edit-announcement' element={<EditAnnouncement />} />
          <Route path='/papers' element={<Papers />} />
          <Route path='/papers/:id' element={<Paper />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/recovery_finish" element={<RecoveryFinish />} />
      </Routes>
    </AnimatePresence>
  )
}
