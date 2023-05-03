import api from '../../api/index'
import { AxiosError } from "axios";
import { errorHandler } from "@utils/errorHandler";

export const likeAnnoun = async (id: any) => {
  const token = localStorage.getItem('access_token')
  console.log('id', id);
  console.log('token', token)
  try {
    await api.post(`/announcements/${id}/favorite/`,{}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: AxiosError | any) {
    errorHandler(error)
  }
}

export async function favorites() {
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