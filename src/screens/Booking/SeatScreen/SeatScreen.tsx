import WarnSvg from '@/assets/svg/warn.svg'
import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text } from 'react-native-paper'
import { SelectSeatType } from '../types'
import { InformationMovie } from './InformationMovie'
import { Modal } from './Modal'
import { Screen } from './Screen'
import { Seat } from './Seat'

const SeatScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_SEAT'>>()
  const [seats, setSeats] = useState<SelectSeatType[]>([])
  const navigation = useNavigation<NavigationProp>()
  const [visible, setVisible] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)

  const showModal = () => setOpenModal(true)
  const hideModal = () => setOpenModal(false)

  const { colors } = useAppTheme()

  const onDismissSnackBar = () => setVisible(false)

  const handleMoveToConfirm = () => {
    if (seats.length !== 0) {
      showModal()

      return
    }

    setVisible(true)
  }

  const { data, isLoading } = useQuery(
    ['schedule', route.params.schedule_id],
    () => getSeatMovie(route.params.schedule_id),
    {
      enabled: !!route.params.schedule_id,
    },
  )

  const handleSelectSeat = (seat: SelectSeatType) => {
    // Check if the seat is already selected
    const isAlreadySelected = seats.some((selectedSeat) => selectedSeat.id === seat.id)

    if (isAlreadySelected) {
      // If the seat is already selected, remove it from the selected seats
      setSeats(seats.filter((selectedSeat) => selectedSeat.id !== seat.id))
    } else {
      if (seats.length >= 8) {
        Alert.alert('Thông báo', 'Bạn chỉ được chọn tối đa 8 ghế!')

        return
      }
      // If the seat is not selected, add it to the selected seats
      setSeats([...seats, seat])
    }
  }

  const handleConfirm = () => {
    setOpenModal(false)

    navigation.navigate('BookingStack', {
      screen: 'BOOKING_CONFIRM',
      params: {
        schedule_id: route.params.schedule_id,
        seats: seats || [],
      },
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
          <View>
            <Header title={data?.cinema.name} />

            <View style={styles.list}>
              <Screen />

              <Seat seatData={data?.seats} seats={seats} handleSelectSeat={handleSelectSeat} />
            </View>

            <View style={styles.button}>
              <InformationMovie schedule={data?.schedule} />

              <Button mode="contained" style={{ borderRadius: 10 }} onPress={handleMoveToConfirm}>
                TIẾP TỤC
              </Button>
            </View>

            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              style={styles.snackBar}
              duration={1000}
            >
              <View style={styles.snackBarView}>
                <WarnSvg />

                <Text style={{ color: colors.background }}>
                  Bạn lòng chọn số lượng ghế tối thiếu là 1!
                </Text>
              </View>
            </Snackbar>
          </View>

          <Modal openModal={openModal} hideModal={hideModal} handleConfirm={handleConfirm} />
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
  snackBar: { marginBottom: 100 },
  snackBarView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    backgroundColor: 'rgba(1 1 1 / 0.4)',
  },
})

export { SeatScreen }
