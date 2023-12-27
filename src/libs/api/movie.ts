import { BookingType, CinemaMovieType, MovieType } from '@/screens/Booking'
import { ApiClientUnAuth } from '../config/react-query'

export const listMovie = async (): Promise<MovieType[]> => {
  try {
    const response = await ApiClientUnAuth.get('movie')

    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieById = async (id: string): Promise<MovieType> => {
  try {
    const response = await ApiClientUnAuth.get(`movie/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getCinemaByMovieId = async (
  id: string,
  start_time: string,
): Promise<CinemaMovieType> => {
  try {
    const response = await ApiClientUnAuth.get(`cinema/by-time/${id}/${start_time}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getSeatMovie = async (id: string): Promise<BookingType> => {
  try {
    const response = await ApiClientUnAuth.get(`seat/by-schedule/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getMyMovie = async (id: string): Promise<MovieType[]> => {
  try {
    const response = await ApiClientUnAuth.get(`movie/user/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
