import { listMovie } from '@/libs/api/movie'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { MovieType } from '../Booking'

const { width, height } = Dimensions.get('window')
const WIDTH = width * 0.7
const PADDING = (width - WIDTH) / 2
const HORIZONTAL = 10
const HEIGHT = height * 0.5

function Backdrop({ scrollX, data }: { scrollX: Animated.Value; data?: MovieType[] }) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          height,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {data?.map((movie, index) => {
        const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH]

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        })

        return (
          <Animated.Image
            key={index}
            source={{ uri: movie.movie_image.map((img) => img.path)[0] }}
            style={[{ width, height, opacity }, StyleSheet.absoluteFillObject]}
          />
        )
      })}
      <LinearGradient
        colors={['transparent', 'white']}
        style={{
          width,
          height: HEIGHT,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  )
}

const SliderHome = () => {
  const navigation = useNavigation<NavigationProp>()
  const scrollX = React.useRef(new Animated.Value(0)).current
  const { data } = useQuery(['movies'], listMovie)

  const handleMoveToDetail = (id: string) => {
    navigation.navigate('BookingStack', { screen: 'BOOKING_MOVIE_DETAIL', params: { id } })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop scrollX={scrollX} data={data} />

      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 150,
          paddingHorizontal: PADDING,
        }}
        snapToInterval={WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH]

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          })
          return (
            <Pressable style={{ width: WIDTH }} onPress={() => handleMoveToDetail(item.id)}>
              <Animated.View
                style={{
                  marginHorizontal: HORIZONTAL,
                  padding: 4,
                  borderRadius: 18,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image
                  source={{ uri: item.movie_image.map((it) => it.path)[0] }}
                  style={styles.posterImage}
                />

                <Text style={{ fontSize: 20, textTransform: 'uppercase' }}>{item.name}</Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 11 }}>{item.duration} phút </Text>

                  <Text style={{ fontSize: 11 }}>
                    {format(new Date(item.released_date), 'dd/MM/yyyy')}
                  </Text>
                </View>

                <Text style={{ color: 'grey' }}>
                  - - - - - - - - - - - - - - - - - - - - - - - -
                </Text>

                <Button
                  mode="contained"
                  onPress={() => handleMoveToDetail(item.id)}
                  style={styles.button}
                >
                  Đặt vé
                </Button>
              </Animated.View>
            </Pressable>
          )
        }}
      />
    </SafeAreaView>
  )
}

export { SliderHome }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  posterImage: {
    width: '100%',
    height: WIDTH * 1.2,
    resizeMode: 'cover',
    borderRadius: 18,
    margin: 0,
    marginBottom: 10,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: WIDTH * 1.2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },
  button: {
    borderRadius: 6,
    marginVertical: 10,
    width: 200,
  },
})
