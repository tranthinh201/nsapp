import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { PaymentSkeleton } from '@/libs/components/Skeleton/Payment'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { DetailPayment } from './DetailPayment'
import { ModalPayment } from './ModalPayment'

const PaymentScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const [openModal, setModal] = useState(false)
  const totalPriceString = route.params.seats
    .reduce((total, seat) => total + seat.price, 0)
    .toLocaleString('vi-VN')

  const { data, isFetching } = useQuery(
    ['schedule', route.params.schedule_id],
    () => getSeatMovie(route.params.schedule_id),
    {
      enabled: !!route.params.schedule_id,
      keepPreviousData: true,
    },
  )

  return (
    <>
      <Header title="Thanh toán" />

      {isFetching ? (
        <PaymentSkeleton length={10} />
      ) : (
        <>
          <ScrollView style={styles.root}>{data && <DetailPayment data={data} />}</ScrollView>

          <View style={styles.button}>
            <View style={styles.price}>
              <Text>Tổng tiền:</Text>

              <Text style={{ fontWeight: '700' }}>{totalPriceString} đ</Text>
            </View>

            <Button mode="contained" style={{ borderRadius: 10 }} onPress={() => setModal(true)}>
              XÁC NHẬN
            </Button>
          </View>

          <ModalPayment openModal={openModal} hideModal={() => setModal(false)} />
        </>
      )}
    </>
  )
}

export { PaymentScreen }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
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
    gap: 6,
    borderTopColor: '#D4D4D4',
    borderTopWidth: 0.5,
  },
  price: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
})
