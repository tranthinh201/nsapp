import { getListFood } from '@/libs/api/food'
import { useAppTheme } from '@/libs/config/theme'
import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const FoodScreen = () => {
  const { colors } = useAppTheme()
  const { data } = useQuery(['food'], getListFood)

  return (
    // <View style={styles.root}>
    //   <Header title="Mua bắp nước" hideHeaderLeft />

    //   <ScrollView style={styles.list}>
    //     {data?.map((item) => (
    //       <TouchableOpacity
    //         key={item.id}
    //         style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginVertical: 10 }}
    //       >
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //           }}
    //         >
    //           <Image source={{ uri: item.image }} style={{ width: 100, height: 150 }} />

    //           <View style={{ width: 220, paddingVertical: 10, marginLeft: 10 }}>
    //             <Text style={{ fontWeight: '700' }}>{item.name}</Text>

    //             <Text style={{ color: colors.grey, fontSize: 12, marginTop: 6, marginBottom: 8 }}>
    //               {item.description}
    //             </Text>

    //             <Text style={{ fontWeight: '700' }}>{item.price.toLocaleString('it-IT')} đ</Text>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //     ))}
    //   </ScrollView>
    // </View>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsMyLocationButton
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
    </View>
  )
}

export { FoodScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
