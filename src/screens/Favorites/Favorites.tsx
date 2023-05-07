import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { CardMain } from '@components/index'
import { favorites, likeAnnoun } from '@store/favorites/favoriteId'
import {
  AnnouncementCardType,
  CardType,
  FavoritesAnnounsmentType,
  FavoritesType,
} from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from '../../api/index'
import { Image, Typography } from 'antd'

function Favorites() {
  const [announcement, setAnnouncement] = useState<FavoritesType[]>([])

  useEffect(() => {
    favorites().then((res) => {
      if (res) {
        setAnnouncement(res)
      }
    })
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
      style={{minHeight: '70vh'}}
    >
      {announcement && announcement[0]
        ? announcement.map(({ photos, announsment }) => (
            <CardMain
              type="profile"
              removeFavorite={removeFavorite}
              key={announsment.slug}
              value={{ ...announsment, photos }}
            />
          ))
        : <Typography.Title style={{textAlign:'center'}} level={3}> <Image src='/noData.png' /> Нету обьявлений.</Typography.Title>}
    </motion.div>
  )
}

export default Favorites
