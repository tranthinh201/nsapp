import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { InformationMovie } from './InformationMovie'
import { Screen } from './Screen'
import { Seat } from './Seat'

const SeatScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_SEAT'>>()
  const [seats, setSeats] = useState<string[]>([])
  const { colors } = useAppTheme()

  const { data, isLoading } = useQuery(
    ['schedule', route.params.schedule_id],
    () => getSeatMovie(route.params.schedule_id),
    {
      enabled: !!route.params.schedule_id,
    },
  )

  const handleSelectSeat = (seat: string) => {
    setSeats((prevSeats) => {
      if (prevSeats.includes(seat)) {
        return prevSeats.filter((item) => item !== seat)
      }

      if (prevSeats.length >= 8) {
        Alert.alert('Thông báo', 'Bạn chỉ được chọn tối đa 8 ghế')
        return prevSeats
      }

      return [...prevSeats, seat]
    })
  }

  return (
    <>
      {!data || isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <Header title={data?.cinema.name} />

          <ScrollView style={styles.list}>
            <Screen />

            <Seat seatData={data?.seats} seats={seats} handleSelectSeat={handleSelectSeat} />
          </ScrollView>

          <View style={styles.button}>
            <InformationMovie schedule={data?.schedule} />

            <Button mode="contained" style={{ borderRadius: 10 }}>
              TIẾP TỤC
            </Button>
          </View>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  button: {
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 22,
  },
})

export { SeatScreen }
