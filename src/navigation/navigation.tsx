import useNotification from '@/libs/hooks/useNotification'
import { RootStore } from '@/store'
import { registerForPushNotificationsAsync } from '@/utils'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import { isEqual } from 'lodash'
import { useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'
import { InformationStack } from './InformationStack'
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

  useNotification()

  const registerPushNotification = async () => {
    try {
      const token = await registerForPushNotificationsAsync()
      if (token) {
        const payload = {
          member_id: `${user?.id}`,
          device_token: token,
          device_token_for_find: token,
          os: Platform.OS,
        }
        // await saveMemberDevice(payload)
      }
    } catch (error) {
      Alert.alert('Error', "ERROR: Can't register push notification")
    }
  }

  useEffect(() => {
    if (user && user.id) {
      registerPushNotification()
    }
  }, [user])

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
      <RootStack.Screen name="InformationStack" component={InformationStack} />
    </RootStack.Navigator>
  )
}

export { Navigation }
