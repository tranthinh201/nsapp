import { AuthStackParams } from './AuthStack/AuthStackParams'
import { MainBottomTabParamList } from './BottomTabs/MainBottomTabParams'
import { MovieStackParams } from './MovieStack'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackParams>
  BottomTabs: NestedNavigatorParams<MainBottomTabParamList>
  MovieStack: NestedNavigatorParams<MovieStackParams>
}
