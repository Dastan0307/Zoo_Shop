import { Empty } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedSelector } from 'src/hooks'

import { CardMain } from '@components/index'
import { favorites, likeAnnoun } from '@store/favorites/favoriteId'
import { FavoritesType } from '@typess/types'

function Favorites() {
  const [announcement, setAnnouncement] = useState<FavoritesType[]>([])
  const { userInfo } = useTypedSelector((store) => store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo?.first_name) {
      navigate('/')
      toast.warning('авторизуйтесь')
    }
    if (userInfo?.first_name) {
      favorites().then((res) => {
        if (res) {
          setAnnouncement(res)
        }
      })
    }
  }, [])

  const removeFavorite = async (slug: string) => {
    const data = announcement.filter((item) => item.announcement != slug)
    setAnnouncement(data)
    await likeAnnoun(slug)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="announcements"
      style={{ minHeight: '70vh' }}
    >
      {announcement && announcement[0] ? (
        announcement.map(({ photos, announsment }) => (
          <CardMain
            type="profile"
            removeFavorite={removeFavorite}
            key={announsment.slug}
            value={{ ...announsment, photos }}
          />
        ))
      ) : (
        <Empty description="Обяъвления отсутствуют" />
      )}
    </motion.div>
  )
}

export default Favorites
