import ScreenSvg from '@/assets/svg/screen.svg'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const Screen = () => {
  return (
    <View style={styles.screen}>
      <ScreenSvg />

      <Text style={styles.text}>MÀN HÌNH</Text>
    </View>
  )
}

export { Screen }

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 5,
  },
})
