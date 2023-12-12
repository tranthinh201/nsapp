import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { MovieDataType } from './data'

const { width } = Dimensions.get('screen')

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
    height: 160,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    objectFit: 'cover',
  },
})
