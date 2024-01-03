import TildeSvg from '@/assets/svg/tilde.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { convertDateToHour, convertDateToWeekAndDay } from '@/utils/date'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { BookingType, SelectSeatType } from '../types'

type InformationMovieProps = {
  screen: BookingType
  seats: SelectSeatType[]
}

const InformationMovie = ({ screen, seats }: InformationMovieProps) => {
  const { colors } = useAppTheme()
  const { schedule } = screen
  const listSeatName = seats
    .map((seat) => seat.name)
    .sort()
    .join(', ')

  const TextGrey = ({ text }: { text: string }) => {
    return <Text style={{ fontSize: 12, color: colors.textGrey }}>{text}</Text>
  }

  return (
    <View style={styles.root}>
      <Text style={[textStyles.text18, styles.title]}>Thông tin phim</Text>

      <View style={styles.container}>
        <Image
          source={{
            uri: schedule.movie.movie_image[0].path,
          }}
          style={styles.image}
        />

        <View>
          <View style={styles.name}>
            <View style={[{ backgroundColor: colors.primary }, styles.warn]}>
              <Text style={[textStyles.text12, styles.textWarn]}>{schedule.movie.limit_age}+</Text>
            </View>

            <Text style={[textStyles.text16]}>{schedule.movie.name}</Text>
          </View>

          <View style={styles.timeLine}>
            <View style={{ borderRightWidth: 1, paddingRight: 6, borderColor: colors.primary }}>
              <Text style={[textStyles.text12, { fontWeight: 'bold' }]}>
                {convertDateToWeekAndDay(schedule?.start_time)}
              </Text>
            </View>

            <View style={styles.time}>
              <TextGrey text={convertDateToHour(schedule.start_time)} />

              <TildeSvg width={12} color={colors.primary} />

              <TextGrey text={convertDateToHour(schedule.end_time)} />
            </View>
          </View>

          <View style={{ display: 'flex', gap: 1 }}>
            <TextGrey text={`Rạp: ${screen.cinema.name}`} />

            <TextGrey text={`Phòng chiếu: ${screen.name}`} />

            <TextGrey text={`Ghế: ${listSeatName}`} />
          </View>
        </View>
      </View>
    </View>
  )
}

export { InformationMovie }

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    gap: 10,
    padding: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 6,
  },
  timeLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  warn: {
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  textWarn: {
    color: '#FFF',
  },
})
