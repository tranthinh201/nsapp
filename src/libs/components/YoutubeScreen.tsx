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

const YoutubeScreen = ({ url, isLoading }: { url: string; isLoading: boolean }) => {
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
        height: 300,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <YoutubeIframe
          height={150}
          width={200}
          play={playing}
          videoId={url}
          onChangeState={onStateChanged}
        />
      )}
    </View>
  )
}

export { YoutubeScreen }
