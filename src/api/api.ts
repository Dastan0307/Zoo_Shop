import axios from "axios";
import { AnnouncementCardType } from "@typess/types";

const BASE_URL = 'https://enactusanimals.com';

const api = axios.create({
  baseURL: BASE_URL,
});

  export const cardApi = {
    async fetchTodos(): Promise<AnnouncementCardType[]> {
      const response = await api.get('/products');
      return response.data;
      
    },
  };

export default api;