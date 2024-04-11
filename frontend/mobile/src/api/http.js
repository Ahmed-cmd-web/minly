import axios from 'axios'

const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
})

export default http
