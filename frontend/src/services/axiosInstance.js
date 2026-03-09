import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gharrpay.onrender.com/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
