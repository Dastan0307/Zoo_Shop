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

// export const disAnnoun = async (id: any) => {
//   const token = localStorage.getItem('access_token')
//   try {
//     await api.delete(`/favorites/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//   } catch (error: AxiosError | any) {
//     errorHandler(error)
//   }
// }
