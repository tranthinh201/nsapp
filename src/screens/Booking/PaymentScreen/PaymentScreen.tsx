import { createTransaction } from '@/libs/api/booking'
import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { PaymentSkeleton } from '@/libs/components/Skeleton/Payment'
import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { RootStore } from '@/store'
import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { DetailPayment } from './DetailPayment'
import { ListPayment } from './ListPayment'

const PaymentScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const mutate = useMutation(createTransaction, {
    onSuccess: () => {
      console.log('Success')
    },
    onError: () => {
      console.log('Error')
    },
  })

  const { data, isFetching } = useQuery(
    ['schedule', route.params.schedule_id],
    () => getSeatMovie(route.params.schedule_id),
    {
      enabled: !!route.params.schedule_id,
      keepPreviousData: true,
    },
  )

  const totalPrice = route.params.seats
    .reduce((total, seat) => total + seat.price, 0)
    .toLocaleString('vi-VN')

  const handleTransaction = () => {
    // mutate.mutate({
    //   schedule_id: route.params.schedule_id,
    //   seats: route.params.seats.map((seat) => seat.id),
    //   user_id: user?.id as string,
    //   payment_type: 'STRIPE',
    //   price: route.params.seats.reduce((total, seat) => total + seat.price, 0),
    //   status: 'SUCCESS',
    // })

    console.log({
      schedule_id: route.params.schedule_id,
      seats: route.params.seats.map((seat) => seat.id),
      user_id: user?.id as string,
      payment_type: 'STRIPE',
      price: route.params.seats.reduce((total, seat) => total + seat.price, 0),
      status: 'SUCCESS',
    })
  }

  return (
    <>
      <Header title="Thanh toán" />

      {isFetching ? (
        <PaymentSkeleton length={10} />
      ) : (
        <>
          <ScrollView style={styles.root}>
            <ListPayment />

            {data && <DetailPayment data={data} />}
          </ScrollView>

          <View style={styles.button}>
            <View style={styles.price}>
              <Text>Tổng tiền:</Text>

              <Text style={{ fontWeight: '700' }}>{totalPrice} đ</Text>
            </View>

            <Button mode="contained" style={{ borderRadius: 10 }} onPress={handleTransaction}>
              XÁC NHẬN
            </Button>
          </View>
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
