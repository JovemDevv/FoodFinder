import axios from 'axios'

const api = axios.create({
  baseURL: 'https://back-finder.onrender.com'
})

export default api