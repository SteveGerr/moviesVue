import axios from 'axios'
import interceptors from './interceptors'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL // По какому адресу делаем запрос
//   params: {
//     apikey: process.env.VUE_APP_API_KEY, // ключ для доступа к АПИ
//     plot: 'full' // Получаем всю информацию
//   }
})

interceptors(instance)

export default instance
