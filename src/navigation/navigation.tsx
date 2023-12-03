import { RootStore } from '@/store'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'
import { RootStackParamList } from './RootStackParams'

const RootStack = createStackNavigator<RootStackParamList>()
export type NavigationProp = StackNavigationProp<RootStackParamList>

const Navigation = () => {
  //Check auth ~ introduce app
  const { user } = useSelector(
    ({ auth, tutorial }: RootStore) => ({
      user: auth.user,
      isFirstTime: auth.isFirstTime,
      isGuestMode: auth.guestMode,
      seenIntroduce: tutorial.seenIntroduce,
    }),
    isEqual,
  )

  if (!user) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
        <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
      <RootStack.Screen name="BottomTabs" component={BottomTabs} />
    </RootStack.Navigator>
  )
}

export { Navigation }
