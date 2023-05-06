import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'

import { CardMain } from '@components/index'
import { favorites } from '@store/favorites/favoriteId'
import { AnnouncementCardType, CardType, FavoritesAnnounsmentType, FavoritesType } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from '../../api/index'
function Favorites() {
  const [announcement, setAnnouncement] = useState<FavoritesType[]>([])
 

  useEffect(() => {
    favorites().then(res => setAnnouncement(res))
  }, [])

  console.log(announcement);
  

  return (
    <div className='announcements'>
      {
        announcement && announcement[0] ? announcement.map(({photos, announsment} ) => 
          <CardMain type='main' key={announsment.slug} value={{...announsment, photos}}/>
        ) : null
      }
    </div>
  )
}

export default Favorites
