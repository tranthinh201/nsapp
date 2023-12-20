import { useAppTheme } from '@/libs/config/theme'
import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import { isEqual } from 'lodash'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const generateDates = (days: number) => {
  let dates = []
  for (let i = 0; i < days; i++) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date)
  }

  return dates
}

const defineDays = (colors: any) => [
  { text: 'C.Nhật', color: 'white', backgroundColor: '#F9D882' },
  { text: 'Thứ 2', color: 'black', backgroundColor: colors.divider },
  { text: 'Thứ 3', color: 'black', backgroundColor: colors.divider },
  { text: 'Thứ 4', color: 'black', backgroundColor: colors.divider },
  { text: 'Thứ 5', color: 'black', backgroundColor: colors.divider },
  { text: 'Thứ 6', color: 'black', backgroundColor: colors.divider },
  { text: 'Thứ 7', color: 'white', backgroundColor: '#F9D882' },
]

type ChooseCalenderProps = {
  handleChooseCalender: (currentDay: number, date: string) => void
  currentDay: number
  date: number
}

const ChooseCalender = ({ currentDay, date, handleChooseCalender }: ChooseCalenderProps) => {
  const dates = generateDates(date)
  const { colors } = useAppTheme()
  const days = defineDays(colors)

  return (
    <View style={styles.root}>
      <FlashList
        data={dates}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              ...styles.touch,
              borderColor:
                currentDay === index ? colors.primary : days[item.getDay()].backgroundColor,
            }}
            onPress={() => handleChooseCalender(index, format(item, 'yyyy-MM-dd'))}
          >
            <View
              style={{
                height: '40%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Animated.Text
                style={{ fontSize: 10, color: currentDay === index ? colors.primary : 'black' }}
              >
                {isEqual(new Date().getDate(), item.getDate()) ? 'H.nay' : days[item.getDay()].text}
              </Animated.Text>
            </View>

            <View
              style={{
                ...styles.calender,
                backgroundColor:
                  currentDay === index ? colors.primary : days[item.getDay()].backgroundColor,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: currentDay === index ? 'white' : days[item.getDay()].color,
                }}
              >
                {item.getDate().toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        estimatedItemSize={200}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export { ChooseCalender }

const styles = StyleSheet.create({
  root: {
    height: 95,
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingLeft: 10,
  },
  touch: {
    width: 45,
    height: '100%',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  calender: {
    width: '100%',
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
})
