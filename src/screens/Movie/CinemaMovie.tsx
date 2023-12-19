import { getCinemaByMovieId } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteMovieStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'date-fns'
import { useState } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const CinemaMovieScreen = () => {
  const route = useRoute<RouteMovieStackType<'MOVIE_CINEMA'>>()
  const { colors } = useAppTheme()
  const [dayChoose, setDayChoose] = useState(0)

  const { data, isLoading } = useQuery(
    ['cinema-movie', route.params.movie_id],
    () => getCinemaByMovieId(route.params.movie_id),
    {
      enabled: !!route.params.movie_id,
    },
  )

  let dates = []

  for (let i = 0; i < 10; i++) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date)
  }

  var days = [
    { text: 'C.Nhật', color: 'white', backgroundColor: '#F9D882' },
    { text: 'Thứ 2', color: 'black', backgroundColor: colors.divider },
    { text: 'Thứ 3', color: 'black', backgroundColor: colors.divider },
    { text: 'Thứ 4', color: 'black', backgroundColor: colors.divider },
    { text: 'Thứ 5', color: 'black', backgroundColor: colors.divider },
    { text: 'Thứ 6', color: 'black', backgroundColor: colors.divider },
    { text: 'Thứ 7', color: 'white', backgroundColor: '#F9D882' },
  ]

  const handleChooseDay = (index: number) => {
    setDayChoose(index)
  }

  return (
    <>
      <Header title="KUNGFU PANDA 4" />

      <ScrollView>
        <View style={{ height: 65, width: Dimensions.get('screen').width }}>
          <FlashList
            data={dates}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  width: 45,
                  height: '100%',
                  borderWidth: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  borderColor:
                    dayChoose === index ? colors.primary : days[item.getDay()].backgroundColor,
                }}
                onPress={() => handleChooseDay(index)}
              >
                <View
                  style={{
                    height: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Animated.Text
                    style={{ fontSize: 10, color: dayChoose === index ? colors.primary : 'black' }}
                  >
                    {isEqual(new Date().getDate(), item.getDate())
                      ? 'H.nay'
                      : days[item.getDay()].text}
                  </Animated.Text>
                </View>

                <View
                  style={{
                    backgroundColor:
                      dayChoose === index ? colors.primary : days[item.getDay()].backgroundColor,
                    width: '100%',
                    height: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: dayChoose === index ? 'white' : days[item.getDay()].color,
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
      </ScrollView>
    </>
  )
}

export { CinemaMovieScreen }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
})
