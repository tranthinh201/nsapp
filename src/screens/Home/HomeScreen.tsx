import { StyleSheet, View } from 'react-native'
import { SliderHome } from './Slider'

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <SliderHome />
    </View>
  )
}

export { HomeScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
})
