import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import YoutubeIframe from 'react-native-youtube-iframe'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const YoutubeSlider = ({ url, isLoading }: { url: string; isLoading: boolean }) => {
  const [playing, setPlaying] = useState<boolean>(false)

  const onStateChanged = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false)
    }
    if (state === 'playing') {
      setPlaying(true)
    }
    if (state === 'paused') {
      setPlaying(false)
    }
  }, [])

  return (
    <View
      style={{
        backgroundColor: playing ? 'black' : 'transparent',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <YoutubeIframe
          height={160}
          width={width}
          play={playing}
          videoId={url}
          onChangeState={onStateChanged}
        />
      )}
    </View>
  )
}

export { YoutubeSlider }
