import { AxiosError } from 'axios'

import { errorHandler } from '@utils/errorHandler'

import api from './index'

export type getChatsProps = {
  id?: number
  customer?: number
  announcement?: string
  photo?: string,
  other_name?:string,
  last_message?: {
    content: string,
    author: number,
    author_name:string,
    author_photo: string,
    date: string
  }
}

export class ChatApi {
  static async getChats() {
    try {
      const data = await api.get<getChatsProps[]>(`/chat/your_chats/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      return data
    } catch (error: AxiosError | any) {
      return errorHandler(error)
    }
  }
}
