import { getCinemaByMovieId } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteMovieStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { ChooseCalender, ListCinema } from './components'

const CinemaMovieScreen = () => {
  const route = useRoute<RouteMovieStackType<'MOVIE_CINEMA'>>()
  const { colors } = useAppTheme()
  const [currentDay, setCurrentDay] = useState(0)
  const [startTime, setStartTime] = useState(format(new Date(), 'yyyy-MM-dd'))

  const { data, isFetching } = useQuery(
    ['cinema-movie', route.params.movie_id, startTime],
    () => getCinemaByMovieId(route.params.movie_id, startTime),
    {
      enabled: !!route.params.movie_id,
    },
  )

  const handleChooseCalender = (index: number, date: string) => {
    setCurrentDay(index)
    setStartTime(date)
  }

  return (
    <>
      <Header title={route.params.name_movie} />

      <ScrollView>
        <ChooseCalender
          currentDay={currentDay}
          handleChooseCalender={handleChooseCalender}
          date={10}
        />

        {isFetching && <ActivityIndicator />}

        {data?.cinema ? (
          <View style={styles.root}>
            <ListCinema data={data} />
          </View>
        ) : (
          <View>
            <Text>NO DATA</Text>
          </View>
        )}
      </ScrollView>
    </>
  )
}

export { CinemaMovieScreen }

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
})
