import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Chat } from '@screens/Chat/Chat'
import EditProfile from '@screens/Edit/EditProfile'
import Favorites from '@screens/Favorites/Favorites'

import { Footer, Header, Layout } from './components'
import {
  AboutUs,
  Announcements,
  Contacts,
  EditAnnouncement,
  Login,
  Main,
  NewAnnouncement,
  OrgPage,
  Paper,
  Papers,
  ProfilePage,
  Recovery,
  RecoveryFinish,
  Register,
  Volunteer,
} from './screens'

export const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='/org/:id' element={<OrgPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/announcement/:id" element={<Announcements />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />
          <Route path="/edit-announcement/:announcement" element={<EditAnnouncement />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/papers/:id" element={<Paper />} />
          <Route path="/papers/:id" element={<AboutUs />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>
        <Route element={<Layout footer={false} />}>
          <Route path="/chats" element={<Chat />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/recovery_finish" element={<RecoveryFinish />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </AnimatePresence>
  )
}
