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
    console.log(token)
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('persist:root:auth')
    dispatch.auth.setUser(null)
  }

  return (
    <View>
      <Text>Home Screen</Text>

      <Button onPress={() => navigation.navigate('BottomTabs', { screen: 'TAB_LIKE' })}>
        CLICK NE
      </Button>

      <Button onPress={handleGetToken}>GET TOKEN</Button>

      <Button onPress={handleLogout}>LOGOUT</Button>

      <EyeSvg />
    </View>
  )
}

export { HomeScreen }
