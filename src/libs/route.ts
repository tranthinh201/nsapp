import { AuthStackParams } from '@/navigation/AuthStack'
import { RouteProp } from '@react-navigation/native'

export type RouteAuthStackType<KEY_SCREEN extends keyof AuthStackParams> = RouteProp<
  AuthStackParams,
  KEY_SCREEN
>
