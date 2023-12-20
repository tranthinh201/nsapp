import TildeSvg from '@/assets/svg/tilde.svg'
import { useAppTheme } from '@/libs/config/theme'
import { format } from 'date-fns'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CinemaType } from '../types'
import { TitleCinema } from './TitleCinema'

type CinemaItemProps = {
  cinema: CinemaType
  movie_format: string
}

const CinemaItem = ({ cinema, movie_format }: CinemaItemProps) => {
  const [expanded, setExpanded] = useState(false)
  const handlePressExpand = () => setExpanded(!expanded)
  const convertDateToHour = (date: string | Date | number) => {
    const time = new Date(date)
    return format(time, 'HH:mm')
  }

  const { colors } = useAppTheme()

  return (
    <View>
      <TitleCinema cinema={cinema} expanded={expanded} handlePressExpand={handlePressExpand} />

      {expanded && (
        <>
          <Text style={{ marginVertical: 4, fontWeight: '700' }}>{movie_format} Phụ đề</Text>

          <View style={styles.container}>
            {cinema.schedule.map((showtime) => (
              <View
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
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  )
}

export { CinemaItem }

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
