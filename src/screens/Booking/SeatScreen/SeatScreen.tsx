import WarnSvg from '@/assets/svg/warn.svg'
import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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

  const totalPrice = seats.reduce((total, seat) => total + seat.price, 0).toLocaleString('vi-VN')

  return (
    <>
      {!data || isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Header title={data?.cinema.name} />

          <ScrollView>
            <View style={styles.list}>
              <Screen />

              <Seat data={data} seats={seats} handleSelectSeat={handleSelectSeat} />
            </View>
          </ScrollView>

          <View style={styles.button}>
            <InformationMovie schedule={data?.schedule} />

            <View style={styles.price}>
              <Text>Tạm tính:</Text>

              <Text style={{ fontWeight: '700' }}>{totalPrice} đ</Text>
            </View>

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

          <Modal openModal={openModal} hideModal={hideModal} handleConfirm={handleConfirm} />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#FFF',
    minHeight: '70%',
  },
  button: {
    zIndex: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 22 : 10,
    marginTop: 10,
    gap: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  snackBar: { marginBottom: 120 },
  snackBarView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  price: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
})

export { SeatScreen }
