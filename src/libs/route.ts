import { AuthStackParams } from '@/navigation/AuthStack'
import { MovieStackParams } from '@/navigation/MovieStack'
import { RouteProp } from '@react-navigation/native'

export type RouteAuthStackType<KEY_SCREEN extends keyof AuthStackParams> = RouteProp<
  AuthStackParams,
  KEY_SCREEN
>

export type RouteMovieStackType<KEY_SCREEN extends keyof MovieStackParams> = RouteProp<
  MovieStackParams,
  KEY_SCREEN
>
