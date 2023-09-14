import axios from 'axios'

export const domain = 'https://44.210.111.114/'

const instance = axios.create({
  baseURL: domain,
})

instance.interceptors.request.use((config) => {
  config.headers.Session = window.sessionStorage.getItem('token')
  return config
})
export default instance
