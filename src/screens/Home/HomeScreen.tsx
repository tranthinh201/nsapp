import EyeSvg from '@/assets/svg/eye.svg'
import { NavigationProp } from '@/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Alert, Platform, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })
    console.log(token)
  } else {
    Alert.alert('Must use physical device for Push Notifications')
  }

  return token.data
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const dispatch = useDispatch()
  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem('persist:root')
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('persist:root:auth')
    dispatch.auth.setUser(null)
  }

  const handleLogIn = async () => {
    navigation.navigate('AuthStack', { screen: 'SIGN_IN' })
  }

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>

      <Button onPress={() => navigation.navigate('BottomTabs', { screen: 'TAB_PROFILE' })}>
        CLICK NE
      </Button>

      <Button onPress={handleGetToken}>GET TOKEN</Button>

      <Button onPress={handleLogout}>LOGOUT</Button>

      <Button onPress={handleLogIn}>LOGIN</Button>

      <Button
        onPress={() =>
          navigation.navigate('AuthStack', {
            screen: 'VERIFICATION',
            params: { email: 'thinh221201@gmail.com' },
          })
        }
      >
        VERIFY
      </Button>

      <Button onPress={() => navigation.navigate('AuthStack', { screen: 'FORGOT_PASSWORD' })}>
        FORGOT
      </Button>

      <Button
        onPress={async () => {
          await sendPushNotification(expoPushToken)
        }}
      >
        PUSH
      </Button>

      <EyeSvg />
    </View>
  )
}

export { HomeScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161621',
  },
})
