import axios from 'axios'

export const API_URL = 'https://zoonet.me'

const instance = axios.create({
  baseURL: API_URL,
})

export default instance
