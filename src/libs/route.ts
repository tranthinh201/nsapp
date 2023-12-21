import { AuthStackParams } from '@/navigation/AuthStack'
import { BookingStackParams } from '@/navigation/BookingStack'
import { RouteProp } from '@react-navigation/native'

export type RouteAuthStackType<KEY_SCREEN extends keyof AuthStackParams> = RouteProp<
  AuthStackParams,
  KEY_SCREEN
>

export type RouteBookingStackType<KEY_SCREEN extends keyof BookingStackParams> = RouteProp<
  BookingStackParams,
  KEY_SCREEN
>
