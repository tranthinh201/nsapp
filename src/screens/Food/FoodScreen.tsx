import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const FoodScreen = () => {
  const { colors } = useAppTheme()

  const listPerson: PersonListType[] = [
    {
      id: 1,
      name: 'MY COMBO',
      description: '1 phần bắp lớn + 1 nước sieu lớn. Nhận trong ngày xem phim',
      price: 50000,
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 2,
      name: 'THINH',
      description: 'THINH',
      price: 50000,
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 3,
      name: 'THINH',
      description: 'THINH',
      price: 50000,
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
    {
      id: 4,
      name: 'THINH',
      description: 'THINH',
      price: 50000,
      avatar:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
    },
  ]

  type PersonListType = {
    id: number
    name: string
    description: string
    avatar: string
    price: number
  }

  return (
    <View style={styles.root}>
      <Header title="Mua bắp nước" hideHeaderLeft />

      <ScrollView style={styles.list}>
        {listPerson.map((item: PersonListType) => (
          <TouchableOpacity
            key={item.id}
            style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginVertical: 10 }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Image source={{ uri: item.avatar }} style={{ width: 100, height: 150 }} />

              <View style={{ width: 220, paddingVertical: 10, marginLeft: 10 }}>
                <Text style={{ fontWeight: '700' }}>{item.name}</Text>

                <Text style={{ color: colors.grey, fontSize: 12, marginTop: 6, marginBottom: 8 }}>
                  {item.description}
                </Text>

                <Text style={{ fontWeight: '700' }}>{item.price.toLocaleString('it-IT')} đ</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export { FoodScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#dfe4ea',
  },
  list: {
    padding: 10,
    marginBottom: 10,
  },
})
