import { ListMediaType, MovieType } from '@/screens/Booking'
import React, { useRef, useState } from 'react'
import { Animated, FlatList, View } from 'react-native'
import { Pagination } from './Pagination'
import { SlideItem } from './SliderItem'

const Slider = ({ movie }: { movie: MovieType }) => {
  let listMedia: ListMediaType[] = []

  // if (movie.trailer_movie) {
  //   listMedia.push({
  //     type: 'video',
  //     path: movie.trailer_movie,
  //   })
  // }

  if (movie.movie_image) {
    const imageMedia = movie.movie_image.map((item) => ({
      type: 'image',
      path: item.path,
    }))

    listMedia = [...listMedia, ...imageMedia] as ListMediaType[]
  }

  const [index, setIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event)
  }

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setIndex(viewableItems[0].index)
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  return (
    <View>
      <FlatList
        data={listMedia}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <Pagination data={listMedia} scrollX={scrollX} />
    </View>
  )
}

export { Slider }
