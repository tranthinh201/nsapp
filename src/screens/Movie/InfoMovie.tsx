import StarSvg from '@/assets/svg/star.svg'
import WarnSvg from '@/assets/svg/warn.svg'
import { Slider } from '@/libs/components'
import { textStyles } from '@/libs/styles'
import { format } from 'date-fns'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { MovieType } from './types'

const InfoDisplay = ({ title, value }: { title: string; value: string | number }) => (
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', fontSize: 12, color: '#8F8F8F' }}>{title}</Text>

    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 12, marginTop: 3 }}>
      {value}
    </Text>
  </View>
)

const InfoMovie = ({ movie }: { movie: MovieType }) => {
  return (
    <>
      <Slider movie={movie} />

      <View style={styles.movie}>
        <Image
          source={{
            uri: movie?.movie_image.map((img) => img.path)[0],
          }}
          style={styles.image}
        />

        <View style={styles.detail}>
          <Text style={styles.name}>{movie.name}</Text>

          <Text style={styles.genre}>{movie.movie_type.name}</Text>

          <View style={styles.rate}>
            <StarSvg width={14} height={14} style={{ marginTop: 2 }} />

            <Text style={styles.numberRate}>9.3/10</Text>

            <Text style={styles.totalRate}>(224 đánh giá)</Text>
          </View>

          <View style={styles.warn}>
            <WarnSvg width={13} height={13} style={{ marginTop: 2.5 }} />

            <Text style={styles.textWarn}>
              Không được phổ biến với người xem dưới 13 tuổi và phải có người bảo hộ đi kèm
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.info}>
        <InfoDisplay
          title="Ngày khởi chiếu"
          value={format(new Date(movie.released_date), 'dd/MM/yyyy')}
        />

        <View style={styles.infoCenter}>
          <InfoDisplay title="Thời lượng" value={movie.duration} />
        </View>

        <InfoDisplay title="Ngôn ngữ" value={movie.language_movie} />
      </View>

      <View style={{ padding: 10, marginTop: 10, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '700', marginBottom: 5 }}>Nội dung phim</Text>

        <Text style={{ fontSize: 14 }}>{movie.brief_movie}</Text>
      </View>
    </>
  )
}

export { InfoMovie }

const styles = StyleSheet.create({
  movie: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    height: 140,
    width: 100,
    borderRadius: 8,
    marginTop: -14,
  },
  detail: {
    marginLeft: 20,
    marginTop: 10,
    height: 'auto',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  genre: {
    ...textStyles.text12,
    color: '#9B9B9B',
  },
  rate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  warn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
    width: 150,
  },
  numberRate: { ...textStyles.text12, fontWeight: '700', marginHorizontal: 4 },
  totalRate: { fontSize: 11, color: '#9B9B9B' },
  textWarn: {
    fontSize: 12,
    color: '#9B9B9B',
    marginLeft: 5,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  infoCenter: {
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#8F8F8F',
    flex: 1,
  },
})
