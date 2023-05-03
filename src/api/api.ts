import axios from "axios"

import { AnnouncementCardType } from "@typess/types"

import { API_URL } from "."


const api = axios.create({
  baseURL: API_URL,
})

export const cardApi = {
  async fetchTodos(): Promise<AnnouncementCardType[]> {
    const response = await api.get('/products')
    return response.data

  },
};

export default api


