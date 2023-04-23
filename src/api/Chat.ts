import { AxiosError } from 'axios'

import { errorHandler } from '@utils/errorHandler'

import api from './index'

export type getChatsProps = {
  id?: number
  customer?: number
  announcement?: string
  last_message?: {
    content: string,
    author: number,
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
