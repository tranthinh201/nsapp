import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { MovieDataType } from './data'

const { width } = Dimensions.get('screen')

const SlideItem = ({ item }: { item: MovieDataType }) => {
  const video = React.useRef(null)

  return (
    <View style={styles.container}>
      {item.img ? (
        <Animated.Image source={{ uri: item.img }} style={styles.image} />
      ) : (
        item.video && (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: item.video,
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
