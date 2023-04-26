import axios from 'axios'

export const API_URL = 'https://enactusanimals.com'

const instance = axios.create({
  baseURL: API_URL,
})

export default instance
