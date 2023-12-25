import { getAccessToken } from '@/libs/asyncStorage'
import { useAppTheme } from '@/libs/config/theme'
import { NavigationProp } from '@/navigation'
import { Dispatch } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { SliderHome } from './Slider'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const dispatch = useDispatch<Dispatch>()
  const { colors } = useAppTheme()
  const handleGetToken = async () => {
    const token = await getAccessToken()
    console.log(token)
  }

  const width = Dimensions.get('window').width

  const handleLogout = async () => {
    await AsyncStorage.removeItem('persist:root:auth')
    dispatch.auth.setUser(null as never)
  }

  const handleLogIn = async () => {
    navigation.navigate('AuthStack', { screen: 'SIGN_IN' })
  }

  return (
    <View style={styles.root}>
      <SliderHome />
      {/* <HeaderAuth />

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

          <View style={{ width: 160 }}>
            <Image
              source={{
                uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
              }}
              height={220}
              width={160}
              style={{
                borderRadius: 8,
              }}
            />

            <View style={{ alignItems: 'center', flex: 1, padding: 4 }}>
              <Text style={{ fontSize: 13, fontWeight: '700' }}>Wonka</Text>

              <Text style={{ ...textStyles.text12, color: colors.grey }}>
                Hài, Gia Đình Giả Tưởng
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 2,
                }}
              >
                <StarSvg width={14} height={14} />

                <Text style={{ ...textStyles.text12, fontWeight: '700', marginHorizontal: 4 }}>
                  9.3/10
                </Text>

                <Text style={textStyles.text12}>(224 đánh giá)</Text>
              </View>

              <Button
                mode="outlined"
                style={{
                  borderRadius: 10,
                  marginTop: 6,
                }}
                labelStyle={{ fontSize: 12 }} // adjust this to change the font size
              >
                ĐĂT VÉ
              </Button>
            </View>
          </View>

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
      </KeyboardAwareScrollView> */}
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
