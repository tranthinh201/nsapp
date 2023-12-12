import { getAccessToken } from '@/libs/asyncStorage'
import { AvatarSetting, HeaderAuth } from '@/libs/components'
import { MovieItem } from '@/libs/components/Movie'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { isEqual } from 'lodash'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const dispatch = useDispatch()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const handleGetToken = async () => {
    const token = await getAccessToken()
    console.log(token)
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
      {user && <HeaderAuth />}

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <Text style={{ color: 'white' }}>Home Screen</Text>
          </View>

          <Button onPress={() => navigation.navigate('BottomTabs', { screen: 'TAB_SETTING' })}>
            CLICK NE
          </Button>

          <Button onPress={handleGetToken}>GET TOKEN</Button>

          <Button onPress={handleLogout}>LOGOUT</Button>

          <Button onPress={handleLogIn}>LOGIN</Button>

          <MovieItem
            image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1"
            name="SOLASHI"
            category="CATEGORY"
            rating={9.3}
            totalRating={224}
            onPress={() => {}}
          />

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
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
})
