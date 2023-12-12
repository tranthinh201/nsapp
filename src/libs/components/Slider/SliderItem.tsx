import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { MovieDataType } from './data'

const { width, height } = Dimensions.get('screen')

const SlideItem = ({ item }: { item: MovieDataType }) => {
  return (
    <View style={styles.container}>
      <Animated.Image source={{ uri: item.img }} style={styles.image} />
    </View>
  )
}

export default SlideItem

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
})
