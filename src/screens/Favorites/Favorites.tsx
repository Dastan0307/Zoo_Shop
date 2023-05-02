import React, { useEffect } from 'react'
import api from '../../api/index'
import { AxiosError } from 'axios'
import { errorHandler } from '@utils/errorHandler'
import { CardMain } from '@components/index'
function Favorites() {
  // const [announcement, setAnnouncement] = useState<>()
  async function name() {
    const token = localStorage.getItem('access_token')
    try {
      const res = await api.get('favorites', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error: AxiosError | any ) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    name().then(res => console.log(res))
  }, [])

  return (
    <div className='announcements'>
      dawdaw
    </div>
  )
}

export default Favorites
