import { getMovieById } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Animated, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { PersonType } from '../types'
import { Comment } from './Comment'
import { InformationMovie } from './InformationMovie'

export type ListMediaType = {
  type: 'image' | 'video'
  path: string
}

const MovieDetailScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_MOVIE_DETAIL'>>()
  const { data, isLoading } = useQuery(
    ['movie-detail', route.params.id],
    () => getMovieById(route.params.id),
    {
      enabled: !!route.params.id,
    },
  )
  const navigation = useNavigation<NavigationProp>()

  let listMedia: ListMediaType[] = []

  if (data?.trailer_movie) {
    listMedia.push({
      type: 'video',
      path: data.trailer_movie,
    })
  }

  if (data?.movie_image) {
    const imageMedia = data.movie_image.map((item) => ({
      type: 'image',
      path: item.path,
    }))

    listMedia = [...listMedia, ...imageMedia] as ListMediaType[]
  }

  const renderItem: ListRenderItem<PersonType> = ({ item, index }) => {
    let isLastItem
    if (data?.persons.length) {
      isLastItem = index === data?.persons.length - 1
    }

    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 100,
          marginRight: isLastItem ? 10 : 0,
          marginLeft: 10,
        }}
      >
        <Image source={{ uri: item.avatar }} style={{ height: 120, borderRadius: 10 }} />

        <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 10 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const video = React.useRef(null)

  const renderList: ListRenderItem<ListMediaType> = ({ item, index }) => {
    const isLastItem = index === listMedia.length - 1

    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: isLastItem ? 10 : 0,
        }}
      >
        {item.type === 'video' && (
          <Video
            ref={video}
            style={{ width: 200, height: 100, borderRadius: 12, marginTop: 34.5 }}
            videoStyle={{ borderRadius: 10 }}
            source={{
              uri: item.path,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}

        <Animated.Image
          source={{ uri: item.path }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </TouchableOpacity>
    )
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  const handleMoveToCinema = () => {
    navigation.navigate('BookingStack', {
      screen: 'BOOKING_LIST_CINEMA',
      params: {
        movie_id: data?.id as string,
        name_movie: data?.name as string,
      },
    })
  }

  const isReleaseDate = () => {
    if (!data?.released_date) return true
    const releaseDate = new Date(data?.released_date)
    const currentDate = new Date()

    return releaseDate > currentDate
  }

  return (
    <>
      <Header title={data?.name.toLocaleUpperCase()} />

      <ScrollView>
        {data && <InformationMovie movie={data} />}

        <View style={styles.list}>
          <Text style={styles.titleList}>Đạo diễn & diễn viên</Text>

          {data?.persons && (
            <FlashList
              data={data?.persons}
              renderItem={renderItem}
              estimatedItemSize={100}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.list}>
          <Text style={styles.titleList}>Hình ảnh & video</Text>

          {data && (
            <FlashList
              data={listMedia}
              renderItem={renderList}
              estimatedItemSize={100}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <Comment />
      </ScrollView>

      {!isReleaseDate() && (
        <View style={styles.button}>
          <Button mode="contained" style={{ borderRadius: 10 }} onPress={handleMoveToCinema}>
            ĐẶT VÉ
          </Button>
        </View>
      )}
    </>
  )
}

export { MovieDetailScreen }

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  titleList: {
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
  },
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
