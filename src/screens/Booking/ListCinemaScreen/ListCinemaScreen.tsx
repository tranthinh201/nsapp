import { getCinemaByMovieId } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { ChooseCalender } from './ChooseCalender'
import { ListCinema } from './ListCinema'

const ListCinemaScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_LIST_CINEMA'>>()
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
        {isFetching ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <>{data?.cinema && <ListCinema data={data} />}</>
        )}
      </ScrollView>
    </>
  )
}

export { ListCinemaScreen }
