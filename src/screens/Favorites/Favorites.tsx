import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { CardMain } from '@components/index'
import { favorites } from '@store/favorites/favoriteId'
import {
  AnnouncementCardType,
  CardType,
  FavoritesAnnounsmentType,
  FavoritesType,
} from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from '../../api/index'

function Favorites() {
  const [announcement, setAnnouncement] = useState<FavoritesType[]>([])

  useEffect(() => {
    favorites().then((res) => {
      if (res) {
        setAnnouncement(res)
      }
    })
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}  className="announcements">
      {announcement && announcement[0]
        ? announcement.map(({ photos, announsment }) => (
            <CardMain
              type="main"
              key={announsment.slug}
              value={{ ...announsment, photos }}
            />
          ))
        : null}
    </motion.div>
  )
}

export default Favorites
