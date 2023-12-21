import { AuthStackParams } from './AuthStack/AuthStackParams'
import { BookingStackParams } from './BookingStack'
import { MainBottomTabParamList } from './BottomTabs/MainBottomTabParams'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackParams>
  BottomTabs: NestedNavigatorParams<MainBottomTabParamList>
  BookingStack: NestedNavigatorParams<BookingStackParams>
}
