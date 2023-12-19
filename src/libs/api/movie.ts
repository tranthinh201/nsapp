import { MovieCinema, MovieType } from '@/screens/Movie'
import { ApiClientUnAuth } from '../config/react-query'

export const listMovie = async (): Promise<MovieType[]> => {
  const response = await ApiClientUnAuth.get('movie')

  return response.data
}

export const getMovieById = async (id: string): Promise<MovieType> => {
  const response = await ApiClientUnAuth.get(`movie/${id}`)

  return response.data
}

export const getCinemaByMovieId = async (id: string): Promise<MovieCinema[]> => {
  const response = await ApiClientUnAuth.get(`cinema/${id}/movie`)

  return response.data
}
