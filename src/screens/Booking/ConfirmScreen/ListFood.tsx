import { getListFood } from '@/libs/api/food'
import { SkeletonListFood } from '@/libs/components/Skeleton/ListFood'
import { textStyles } from '@/libs/styles'
import { FoodType } from '@/screens/Food/type'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const ListFood = () => {
  const { data, isFetching } = useQuery(['food'], getListFood, {
    keepPreviousData: true,
  })

  const renderItem = ({ item }: { item: FoodType }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ gap: 6 }}>
        <Text style={{ textTransform: 'uppercase' }}>{item.name}</Text>

        <Text style={[{ fontWeight: '700' }, textStyles.text12]}>{item.price} đ</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.root}>
      <Text style={[textStyles.text18, { fontWeight: '700' }]}>Combo bắp nước</Text>

      {isFetching ? (
        <SkeletonListFood length={2} />
      ) : (
        <FlashList
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
        />
      )}
    </View>
  )
}

export { ListFood }

const styles = StyleSheet.create({
  root: {
    paddingLeft: 15,
    gap: 10,
  },
  item: {
    width: 250,
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    gap: 10,
    marginRight: 10,
  },
  image: { width: 50, height: 50 },
})
