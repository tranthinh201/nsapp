import { AuthStackParams } from '@/navigation/AuthStack'
import { BookingStackParams } from '@/navigation/BookingStack'
import { ProfileStackParams } from '@/navigation/ProfileStack/ProfileStackParams'
import { RouteProp } from '@react-navigation/native'

export type RouteAuthStackType<KEY_SCREEN extends keyof AuthStackParams> = RouteProp<
  AuthStackParams,
  KEY_SCREEN
>

export type RouteBookingStackType<KEY_SCREEN extends keyof BookingStackParams> = RouteProp<
  BookingStackParams,
  KEY_SCREEN
>

export type RouteProfileStackType<KEY_SCREEN extends keyof ProfileStackParams> = RouteProp<
  ProfileStackParams,
  KEY_SCREEN
>
