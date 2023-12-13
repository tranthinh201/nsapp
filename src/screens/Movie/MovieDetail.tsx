import { Header } from '@/libs/components'
import { MovieDataType, data } from '@/libs/components/Slider/data'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { InfoMovie } from './InfoMovie'

const MovieDetail = () => {
  const { width } = Dimensions.get('screen')

  const listPerson = [
    {
      id: 1,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 2,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 3,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 4,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 5,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 6,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 7,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 8,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 9,
      name: 'THINH',
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
  ]

  type PersonListType = {
    id: number
    name: string
    avatar: string
  }

  const renderItem: ListRenderItem<PersonListType> = ({ item }) => {
    return (
      <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        />

        <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const renderImageMovie: ListRenderItem<PersonListType> = ({ item }) => {
    return (
      <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </TouchableOpacity>
    )
  }

  const video = React.useRef(null)

  const renderList: ListRenderItem<MovieDataType> = ({ item }) => {
    return (
      <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }}>
        {item.img ? (
          <Animated.Image
            source={{ uri: item.img }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        ) : (
          <Video
            ref={video}
            style={{ width: 200, height: 100, borderRadius: 10 }}
            videoStyle={{ borderRadius: 10 }}
            source={{
              uri: item.video as string,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Header title="WONKA" />

      <ScrollView>
        <InfoMovie />

        <View style={styles.list}>
          <Text style={styles.titleList}>Đạo diễn & diễn viên</Text>

          {listPerson && (
            <FlashList
              data={listPerson}
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
              data={data}
              renderItem={renderList}
              estimatedItemSize={100}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.button}>
        <Button mode="contained" style={{ borderRadius: 10 }}>
          DAT VE
        </Button>
      </View>
    </>
  )
}

export { MovieDetail }

const styles = StyleSheet.create({
  list: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  titleList: {
    fontWeight: '700',
    marginBottom: 10,
  },
  button: {
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 22,
  },
})
