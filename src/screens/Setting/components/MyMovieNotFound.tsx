import CinemaPng from '@/assets/img/cinema.png'
import { useAppTheme } from '@/libs/config/theme'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

type MyMovieNotFoundType = {
  title: string
  subtitle: string
  buttonTitle: string
  isNoMovie: boolean
}

const MyMovieNotFound = ({ buttonTitle, isNoMovie, subtitle, title }: MyMovieNotFoundType) => {
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()
  const handleToHome = () => {
    navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
  }

  return (
    <View style={styles.root}>
      <Image source={CinemaPng} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: colors.textGrey, fontSize: 12 }}>{subtitle}</Text>

        {isNoMovie && (
          <Text style={{ color: colors.textGrey, fontSize: 12 }}>
            Trang phim của bạn thật hoành tránh nhé.
          </Text>
        )}
      </View>

      <Button mode="contained" style={styles.button} onPress={handleToHome}>
        {buttonTitle}
      </Button>
    </View>
  )
}

export { MyMovieNotFound }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 8,
    gap: 8,
  },
  image: { width: 100, height: 100 },
  title: { textAlign: 'center', fontWeight: '700', fontSize: 16 },
  button: { borderRadius: 6, marginTop: 10 },
})
