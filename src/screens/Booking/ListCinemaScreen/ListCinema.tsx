import TicketImage from '@/assets/img/ticket.png'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CinemaMovieType } from '../types'
import { Cinema } from './Cinema'

type ListCinemaProps = {
  data: CinemaMovieType
}

const ListCinema = ({ data }: ListCinemaProps) => {
  const { colors } = useAppTheme()

  return (
    <>
      {data.cinema.length <= 0 ? (
        <View style={styles.not_found}>
          <Image source={TicketImage} style={{ height: 76, width: 76 }} />

          <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Text
              style={[
                textStyles.content16,
                {
                  fontWeight: '700',
                },
              ]}
            >
              Hôm nay chưa có suất chiếu.
            </Text>

            <Text style={[textStyles.text12, { color: colors.textGray }]}>
              Bạn hãy tìm thử ngày khác nhé.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.root}>
          <Text style={[{ color: colors.primary, fontWeight: '700' }, textStyles.text18]}>
            Rạp đề xuất ({data.cinema.length})
          </Text>

          {data.cinema.map((cinema, index) => (
            <Cinema cinema={cinema} movie_format={data.movie.movie_format.name} key={index} />
          ))}
        </View>
      )}
    </>
  )
}

export { ListCinema }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 12,
    padding: 10,
    marginHorizontal: 10,
  },
  container: { padding: 10 },
  not_found: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 6,
    height: 300,
    gap: 30,
  },
})
