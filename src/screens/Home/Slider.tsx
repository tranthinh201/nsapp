import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

const imagenes = [
  'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcScUwXu7wznX70mqPhL4ZJx93F-YkMZyUaEllCS2kICBqUmHpzM',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80',
  'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80',
  'https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80',
]

type MovieDataType = {
  id: number
  name: string
  img: string
}

const data: MovieDataType[] = [
  {
    id: 1,
    name: 'The Flash',
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
  {
    id: 2,
    name: 'The Flash',
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcScUwXu7wznX70mqPhL4ZJx93F-YkMZyUaEllCS2kICBqUmHpzM',
  },
  {
    id: 3,
    name: 'What If...?',
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
  {
    id: 4,
    name: 'Wonka',
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
  {
    id: 5,
    name: 'Doraemon',
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
]

const { width, height } = Dimensions.get('window')
const WIDTH = width * 0.7
const PADDING = (width - WIDTH) / 2
const HORIZONTAL = 10
const HEIGHT = height * 0.5

function Backdrop({ scrollX }: { scrollX: Animated.Value }) {
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
      {data.map((movie, index) => {
        const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH]

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        })

        return (
          <Animated.Image
            key={index}
            source={{ uri: movie.img }}
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

  const handleMoveToDetail = () => {
    navigation.navigate('MovieStack', { screen: 'MOVIE_DETAIL', params: { id: '1' } })
  }

  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar hidden /> */}

      <Backdrop scrollX={scrollX} />

      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 200,
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
            <TouchableOpacity style={{ width: WIDTH }} onPress={handleMoveToDetail}>
              <Animated.View
                style={{
                  marginHorizontal: HORIZONTAL,
                  padding: HORIZONTAL,
                  borderRadius: 34,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={{ uri: item.img }} style={styles.posterImage} />

                <Text style={{ fontWeight: 'bold', fontSize: 26 }}>{item.name}</Text>
              </Animated.View>
            </TouchableOpacity>
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
    borderRadius: 24,
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
})
