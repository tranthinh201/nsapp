import { createTransaction } from '@/libs/api/booking'
import { createIntent } from '@/libs/api/payment'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { Dispatch, RootStore } from '@/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { View } from 'moti'
import { Alert, StyleSheet } from 'react-native'
import { Button, Modal as ModalPaper, Portal, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
}

const ModalPayment = ({ openModal, hideModal }: ModalProps) => {
  const dispatch = useDispatch<Dispatch>()
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const navigation = useNavigation<NavigationProp>()
  const mutate = useMutation(createTransaction, {
    onSuccess: () => {
      Alert.alert('Thông báo', 'Đặt vé thành công!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
          },
        },
      ])
    },
    onError: () => {
      console.log('Error')
    },
  })

  const createPaymentIntent = useMutation(createIntent, {
    onError: () => {
      Alert.alert('Thông báo', 'Khoi tạo thanh toán thất bại!')
    },
  })

  const { initPaymentSheet } = useStripe()

  const onCheckout = async () => {
    const totalPrice = route.params.seats.reduce((total, seat) => total + seat.price, 0)
    //1. Create payment intent on the server
    const { data: clientSecret } = await createPaymentIntent.mutateAsync({
      amount: totalPrice,
    })

    //2. Initialize the payment sheet
    const { error, paymentOption } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Movie App',
    })

    if (error) {
      console.log('initResponse.error', error)
      Alert.alert('Thông báo', 'Thanh toán thất bại!')
      return
    }

    console.log('initResponse', paymentOption)

    // mutate.mutate({
    //   schedule_id: route.params.schedule_id,
    //   seats: route.params.seats.map((seat) => seat.id),
    //   user_id: user?.id as string,
    //   payment_type: 'STRIPE',
    //   price: totalPrice,
    //   status: 'SUCCESS',
    // })
  }

  return (
    <Portal>
      <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Thanh toán</Text>

          <Text>
            Hãy nhập thông tin thẻ của bạn để thanh toán. Chúng tôi sẽ không lưu lại thông tin thẻ
          </Text>

          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{ backgroundColor: '#EFEFEF' }}
            style={{ height: 50 }}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Button onPress={hideModal} style={styles.button}>
            ĐÓNG
          </Button>

          <Button mode="contained" style={styles.button}>
            THANH TOÁN
          </Button>
        </View>
      </ModalPaper>
    </Portal>
  )
}

export { ModalPayment }

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  button: { borderRadius: 6, width: '50%' },
})
