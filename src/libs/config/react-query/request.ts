import { STORAGE_KEY, getAccessToken } from '@/libs/asyncStorage'
import { Dispatch } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'

const baseURL = 'https://nsbe.onrender.com/'
// const baseURL = 'http://localhost:5000/'

// Create an authenticated Axios instance
export const ApiClient = Axios.create({
  baseURL,
})

// Request interceptor for adding the token to authenticated requests
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

ApiClient.interceptors.request.use(authRequestInterceptor)

// Create an unauthenticated Axios instance
export const ApiClientUnAuth = Axios.create({
  baseURL,
})

// AxiosInterceptor component for handling responses and errors
export const AxiosInterceptor = ({ children }: any) => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: AxiosError) => {
      console.log({ error })

      if (error.response?.status === 401) {
        dispatch.auth.setUser(null as never)
        AsyncStorage.removeItem(STORAGE_KEY.TOKEN)
        Alert.alert('Error', 'Token Expired!')
      }

      return Promise.reject(error.message)
    }
    const interceptor = ApiClient.interceptors.response.use(resInterceptor, errInterceptor)

    return () => ApiClient.interceptors.response.eject(interceptor)
  }, [])
  return children
}
