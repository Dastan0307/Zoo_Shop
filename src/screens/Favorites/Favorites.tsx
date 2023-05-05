import React, { useEffect, useState } from 'react'
import api from '../../api/index'
import { AxiosError } from 'axios'
import { errorHandler } from '@utils/errorHandler'
import { CardMain } from '@components/index'
import { favorites } from '@store/favorites/favoriteId'
import { AnnouncementCardType, CardType, FavoritesAnnounsmentType, FavoritesType } from '@typess/types'
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
