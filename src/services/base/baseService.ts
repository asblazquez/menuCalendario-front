import axios from 'axios'

const URL_API = import.meta.env.VITE_URL_API

const instance = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

class BaseService {
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await instance.get(url, { params })
      return response.data
    } catch (error) {
      console.error('Error al realizar la petición GET:', error)
      throw error
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await instance.post(url, data)
      return response.data
    } catch (error) {
      console.error('Error al realizar la petición POST:', error)
      throw error
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      const response = await instance.put(url, data)
      return response.data
    } catch (error) {
      console.error('Error al realizar la petición PUT:', error)
      throw error
    }
  }
}

export default new BaseService()
