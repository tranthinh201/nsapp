import { listMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { SkeletonListComing } from '@/libs/components/Skeleton/ListComing'
import { useAppTheme } from '@/libs/config/theme'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { MovieType } from '../Booking'

const ComingScreen = () => {
  const { data, isFetching } = useQuery(['coming'], listMovie)
  const { colors } = useAppTheme()

  const renderItem = ({ item }: { item: MovieType }) => {
    return (
      <View style={{ gap: 4, paddingBottom: 20, marginTop: 10, marginLeft: 10 }}>
        <Image source={{ uri: item.movie_image.map((img) => img.path)[0] }} style={styles.image} />

        <Text style={{ fontSize: 11, fontWeight: '700' }}>
          {format(new Date(item.released_date), 'dd/MM').split('/').join(' Thg ')}
        </Text>

        <Text style={{ fontWeight: '700' }}>{item.name}</Text>

        <Text style={{ fontSize: 11, color: colors.textGrey }}>{item.movie_type.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <Header title="Phim sắp chiếu" hideHeaderLeft />

      <ScrollView>
        {isFetching ? (
          <SkeletonListComing length={3} />
        ) : (
          <>
            {data?.map((item) => (
              <View style={styles.main} key={item.id}>
                <Text style={styles.title}>Tháng 12/2023</Text>

                <FlashList
                  data={data}
                  estimatedItemSize={100}
                  horizontal
                  renderItem={renderItem}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  )
}

export { ComingScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  main: {
    height: 300,
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 10,
  },
  image: { width: 140, height: 180, borderRadius: 10 },
  title: { fontWeight: '700', marginLeft: 10 },
})
