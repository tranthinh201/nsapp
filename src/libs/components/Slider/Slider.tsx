import React, { useRef, useState } from 'react'
import { Animated, FlatList, View } from 'react-native'
import { Pagination } from './Pagination'
import SlideItem from './SliderItem'
import { data } from './data'

const Slider = () => {
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
        data={data}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  )
}

export { Slider }
