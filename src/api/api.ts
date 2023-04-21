import axios from "axios";
import { CardTypes } from "@typess/types";

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});


  export const cardApi = {
    async fetchTodos(): Promise<CardTypes[]> {
      const response = await api.get('/products');
      return response.data;
    },
  };

export default api;