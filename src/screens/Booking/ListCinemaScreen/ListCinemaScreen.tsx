import { getCinemaByMovieId } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { SkeletonCinema } from '@/libs/components/Skeleton/Cinema'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { ChooseCalender } from './ChooseCalender'
import { ListCinema } from './ListCinema'

const ListCinemaScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_LIST_CINEMA'>>()
  const [currentDay, setCurrentDay] = useState(0)
  const [startTime, setStartTime] = useState(format(new Date(), 'yyyy-MM-dd'))

  const { data, isFetching } = useQuery(
    ['cinema-movie', route.params.movie_id, startTime],
    () => getCinemaByMovieId(route.params.movie_id, startTime),
    {
      enabled: !!route.params.movie_id,
      keepPreviousData: true,
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
        {isFetching ? <SkeletonCinema length={7} /> : data?.cinema && <ListCinema data={data} />}
      </ScrollView>
    </>
  )
}

export { ListCinemaScreen }
