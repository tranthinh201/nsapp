import { Header } from '@/libs/components'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'

export type ListMediaType = {
  type: 'image' | 'video'
  path: string
}

const CommentScreen = () => {
  const route = useRoute<RouteBookingStackType<'COMMENT'>>()

  return (
    <>
      <Header title="Viết đánh giá" />

      <ScrollView></ScrollView>

      <View style={styles.button}>
        <Button mode="contained" style={{ borderRadius: 10 }} disabled>
          Gửi đánh giá
        </Button>
      </View>
    </>
  )
}

export { CommentScreen }

const styles = StyleSheet.create({
  button: {
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 22 : 10,
  },
})
