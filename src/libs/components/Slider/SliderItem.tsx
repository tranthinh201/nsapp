import { ListMediaType } from '@/screens/Booking'
import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { YoutubeSlider } from './YoutubeSlider'

const { width } = Dimensions.get('screen')

const SlideItem = ({ item }: { item: ListMediaType }) => {
  const idYoutube = item.path.split('v=')[1]

  return (
    <View style={styles.container}>
      {item.type === 'image' ? (
        <Animated.Image source={{ uri: item.path }} style={styles.image} />
      ) : (
        item.type === 'video' && <YoutubeSlider url={idYoutube} isLoading={false} />
      )}
    </View>
  )
}

export { SlideItem }

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
  video: {
    flex: 1,
    width: '100%',
  },
})
