import FilmReel from '@/assets/img/film-reel.png'
import { Header } from '@/libs/components'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'moti'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

const UnAuthSetting = () => {
  const navigation = useNavigation<NavigationProp>()
  const handleToSignIn = () => {
    navigation.navigate('AuthStack', { screen: 'SIGN_IN' })
  }

  return (
    <View style={styles.container}>
      <Header title="Hồ sơ" />

      <View style={styles.root}>
        <Image source={FilmReel} style={styles.image} />

        <Text style={styles.title}>Đăng nhập vào tài khoản của bạn</Text>

        <Button mode="outlined" style={styles.button} onPress={handleToSignIn}>
          Đăng nhập
        </Button>
      </View>
    </View>
  )
}

export { UnAuthSetting }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 8,
    gap: 10,
    padding: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    borderRadius: 6,
  },
  image: { width: 100, height: 100 },
})
