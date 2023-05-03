import { toast } from 'react-toastify'

import api from '@api/api'

export const postAdress = async ({
  adress,
  adress_type,
  title,
  image,
  phone_number,
  location,
  id,
}: {
  adress: string
  adress_type: string
  // verified_adress: boolean
  title: string
  image: string | any
  phone_number: string
  location: string
  id: number
}) => {
  try {
    const formData = new FormData()
    formData.append('adress', adress)
    formData.append('adress_type', adress_type)
    formData.append('title', title)
    formData.append('phone_number', phone_number)
    formData.append('location', location)
    formData.append('image', image)
    const response = await api.post(`/account/${id}/add_adress/`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    toast.success('Успешно отправлен')
    return response
  } catch (error) {
    toast.error('Ошибка при отправление данных!')
  }
}
