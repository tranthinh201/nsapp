import { AvatarSetting, HeaderAuth } from '@/libs/components'
import { NavigationProp } from '@/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    <View style={styles.root}>
      <HeaderAuth />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <Text style={{ color: 'white' }}>Home Screen</Text>
          </View>

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

          <Button
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'SIGN_UP',
              })
            }
          >
            SIGN UP
          </Button>

          <Button onPress={() => navigation.navigate('AuthStack', { screen: 'FORGOT_PASSWORD' })}>
            FORGOT
          </Button>

          <AvatarSetting source={{ uri: undefined }} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { HomeScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#1F1D2B',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
})
