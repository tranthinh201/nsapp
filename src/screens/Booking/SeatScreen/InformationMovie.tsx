import TildeSvg from '@/assets/svg/tilde.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { convertDateToHour, convertDateToWeekAndDay } from '@/utils/date'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { ScheduleType } from '../types'

type InformationMovieProps = {
  schedule: ScheduleType
}

const InformationMovie = ({ schedule }: InformationMovieProps) => {
  const { colors } = useAppTheme()

  return (
    <View style={styles.root}>
      <Text style={[textStyles.text14, { fontWeight: '700' }]}>{schedule.movie.name}</Text>

      <View style={styles.container}>
        <View style={styles.time}>
          <Text style={{ fontSize: 12, color: colors.textGrey }}>
            {convertDateToHour(schedule.start_time)}
          </Text>

          <TildeSvg width={12} color={colors.textGray} />

          <Text style={{ fontSize: 12, color: colors.textGrey }}>
            {convertDateToHour(schedule.end_time)}
          </Text>
        </View>

        <View style={{ borderLeftWidth: 1, paddingHorizontal: 5 }}>
          <Text style={textStyles.text12}>{convertDateToWeekAndDay(schedule?.start_time)}</Text>
        </View>
      </View>
    </View>
  )
}

export { InformationMovie }

const styles = StyleSheet.create({
  root: {
    height: 40,
  },
  container: { display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 5 },
  time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
})
