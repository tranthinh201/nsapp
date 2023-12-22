import TildeSvg from '@/assets/svg/tilde.svg'
import { useAppTheme } from '@/libs/config/theme'
import { NavigationProp } from '@/navigation'
import { convertDateToHour } from '@/utils/date'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CinemaType } from '../types'
import { TitleCinema } from './Title'

type CinemaProps = {
  cinema: CinemaType
  movie_format: string
}

const Cinema = ({ cinema, movie_format }: CinemaProps) => {
  const [expanded, setExpanded] = useState(false)
  const handlePressExpand = () => setExpanded(!expanded)

  const navigation = useNavigation<NavigationProp>()

  const { colors } = useAppTheme()

  return (
    <View style={{ padding: 10 }}>
      <TitleCinema cinema={cinema} expanded={expanded} handlePressExpand={handlePressExpand} />

      {expanded && (
        <>
          <Text style={{ marginVertical: 4, fontWeight: '700' }}>{movie_format} Phụ đề</Text>

          <View style={styles.container}>
            {cinema.schedule.map((showtime) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('BookingStack', {
                    screen: 'BOOKING_SEAT',
                    params: { schedule_id: showtime.id, name_cinema: showtime.screen.cinema_id },
                  })
                }
                style={[
                  styles.schedule,
                  {
                    borderColor: colors.divider,
                  },
                ]}
                key={showtime.id}
              >
                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                  {convertDateToHour(showtime.start_time)}
                </Text>

                <TildeSvg width={12} color={colors.textGray} />

                <Text style={{ fontSize: 11, color: colors.textGrey }}>
                  {convertDateToHour(showtime.end_time)}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </View>
  )
}

export { Cinema }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  schedule: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 105,
    margin: 5,
  },
})
