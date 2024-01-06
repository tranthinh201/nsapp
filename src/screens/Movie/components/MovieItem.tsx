import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { MovieType } from '@/screens/Booking'
import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'moti'
import { Pressable, StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'

type MovieItemProps = {
  movie: MovieType
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigation = useNavigation<NavigationProp>()
  const handleMoveToDetail = (id: string) =>
    navigation.navigate('BookingStack', { screen: 'BOOKING_MOVIE_DETAIL', params: { id } })
  const { colors } = useAppTheme()

  return (
    <Pressable
      style={{ gap: 7, paddingBottom: 20, marginTop: 10, flexDirection: 'row' }}
      onPress={() => handleMoveToDetail(movie.id)}
    >
      <Image source={{ uri: movie.movie_image.map((img) => img.path)[0] }} style={styles.image} />

      <View>
        <Text style={{ fontWeight: '700' }}>{movie.name}</Text>
        <Text style={{ fontSize: 11, color: colors.textGrey }}>{movie.duration} phút</Text>
        <Text style={{ fontSize: 11, color: colors.textGrey }}>{movie.movie_type.name}</Text>
        <Text style={{ fontSize: 11, color: colors.textGrey }}>
          {movie.movie_format.name} {movie.language_movie}
        </Text>

        <Divider style={{ marginVertical: 10 }} />

        <Text style={{ fontSize: 11, color: colors.textGrey }}>{movie.brief_movie}</Text>
      </View>
    </Pressable>
  )
}

export { MovieItem }

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
  numberRate: { ...textStyles.text12, fontWeight: '700', marginHorizontal: 4 },
  totalRate: { fontSize: 11, color: '#9B9B9B' },
  rate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
