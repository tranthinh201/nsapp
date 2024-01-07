import { ListMediaType } from '@/screens/Booking'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('screen')

const SlideItem = ({ item }: { item: ListMediaType }) => {
  const video = React.useRef(null)

  return (
    <View style={styles.container}>
      {item.type === 'image' ? (
        <Animated.Image source={{ uri: item.path }} style={styles.image} />
      ) : (
        item.type === 'video' && (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: item.path,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        )
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
