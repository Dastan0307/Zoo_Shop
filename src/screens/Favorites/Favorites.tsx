import React, { useEffect, useState } from 'react'
import api from '../../api/index'
import { AxiosError } from 'axios'
import { errorHandler } from '@utils/errorHandler'
import { CardMain } from '@components/index'
import { favorites } from '@store/favorites/favoriteId'
import { FavoritesAnnounsmentType, FavoritesType } from '@typess/types'
function Favorites() {
  const [announcement, setAnnouncement] = useState<FavoritesAnnounsmentType[]>([])
 

  useEffect(() => {
    favorites().then(res => setAnnouncement(res))
  }, [])

  console.log(announcement);
  

  return (
    <div className='announcements'>
      dawdaw
    </div>
  )
}

export default Favorites
