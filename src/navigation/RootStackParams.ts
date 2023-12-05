import { AuthStackParams } from './AuthStack/AuthStackParams'
import { MainBottomTabParamList } from './BottomTabs/MainBottomTabParams'
import { InformationStackParamsList } from './InformationStack'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackParams>
  BottomTabs: NestedNavigatorParams<MainBottomTabParamList>
  InformationStack: NestedNavigatorParams<InformationStackParamsList>
}
