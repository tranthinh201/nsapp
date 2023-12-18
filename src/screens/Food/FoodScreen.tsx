import { getListFood } from '@/libs/api/food'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { useQuery } from '@tanstack/react-query'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const FoodScreen = () => {
  const { colors } = useAppTheme()
  const { data } = useQuery(['food'], getListFood)

  return (
    <View style={styles.root}>
      <Header title="Mua bắp nước" hideHeaderLeft />

      <ScrollView style={styles.list}>
        {data?.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginVertical: 10 }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Image source={{ uri: item.image }} style={{ width: 100, height: 150 }} />

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
