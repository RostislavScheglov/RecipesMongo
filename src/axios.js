import axios from 'axios'

export const domain = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: domain,
})

instance.interceptors.request.use((config) => {
  config.headers.Session = window.sessionStorage.getItem('token')
  return config
})
export default instance
