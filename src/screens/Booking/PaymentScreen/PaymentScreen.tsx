import { createTransaction } from '@/libs/api/booking'
import { getSeatMovie } from '@/libs/api/movie'
import { createIntent } from '@/libs/api/payment'
import { Header } from '@/libs/components'
import { PaymentSkeleton } from '@/libs/components/Skeleton/Payment'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useStripe } from '@stripe/stripe-react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { DetailPayment } from './DetailPayment'
import { ModalPayment } from './ModalPayment'
import { WarnPayment } from './components'

const PaymentScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const navigation = useNavigation<NavigationProp>()
  const queryClient = useQueryClient()
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

  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  const createPaymentIntent = useMutation(createIntent, {
    onError: () => {
      Alert.alert('Thông báo', 'Khởi tạo thanh toán thất bại!')
    },
  })

  const mutate = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myTicket', user?.id])
      Alert.alert('Thông báo', 'Đặt vé thành công!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
          },
        },
      ])
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const onTransaction = async () => {
    const totalPrice = route.params.seats.reduce((total, seat) => total + seat.price, 0)

    const { paymentIntent: clientSecret } = await createPaymentIntent.mutateAsync({
      amount: totalPrice,
    })

    if (!clientSecret) Alert.alert('Thông báo', 'Khởi tạo thanh toán thất bại!')

    const { error: errorInitPayment } = await initPaymentSheet({
      merchantDisplayName: 'Movie App',
      paymentIntentClientSecret: clientSecret,
      returnURL: 'movieapp://stripe-redirect',
      defaultBillingDetails: {
        name: user?.last_name,
        phone: user?.phone_number,
        email: user?.email,
      },
    })

    if (errorInitPayment) {
      Alert.alert('Thông báo', 'Khởi tạo tạo thanh toán thất bại!')
      return
    }

    const { error, paymentOption } = await presentPaymentSheet()

    if (error) {
      return
    }

    mutate.mutate({
      schedule_id: route.params.schedule_id,
      seats: route.params.seats.map((seat) => seat.id),
      user_id: user?.id as string,
      price: totalPrice,
      payment_status: 'SUCCESS',
      payment_intent_id: clientSecret,
      foods: [],
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
            {data && <DetailPayment data={data} />}

            <WarnPayment />
          </ScrollView>

          <View style={styles.button}>
            <View style={styles.price}>
              <Text>Tổng tiền:</Text>

              <Text style={{ fontWeight: '700' }}>{totalPriceString} đ</Text>
            </View>

            <Button mode="contained" style={{ borderRadius: 10 }} onPress={handleOpenModal}>
              XÁC NHẬN
            </Button>
          </View>

          <ModalPayment openModal={openModal} hideModal={handleCloseModal} />
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
    gap: 10,
    borderTopColor: '#D4D4D4',
    borderTopWidth: 0.5,
  },
  price: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
