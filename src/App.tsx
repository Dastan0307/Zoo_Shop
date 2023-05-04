import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Chat } from '@screens/Chat/Chat'
import EditProfile from '@screens/Edit/EditProfile'
import Favorites from '@screens/Favorites/Favorites'

import { Footer, Header, Layout } from './components'
import {
  AboutUs,
  Announcements,
  EditAnnouncement,
  Login,
  Main,
  NewAnnouncement,
  Paper,
  Papers,
  ProfilePage,
  Recovery,
  RecoveryFinish,
  Register,
} from './screens'

export const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/announcement/:id" element={<Announcements />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />
          <Route path="/edit-announcement/:announcement" element={<EditAnnouncement />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/papers/:id" element={<Paper />} />
          <Route path="/papers/:id" element={<AboutUs />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/favorites" element={<Favorites />} />
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
