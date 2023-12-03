import EyeSvg from '@/assets/svg/eye.svg'
import { NavigationProp } from '@/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

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

  return (
    <View>
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

      <EyeSvg />
    </View>
  )
}

export { HomeScreen }
