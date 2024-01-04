import { createTransaction } from '@/libs/api/booking'
import { createIntent } from '@/libs/api/payment'
import { RouteBookingStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { View } from 'moti'
import { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Modal as ModalPaper, Portal, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
}

const ModalPayment = ({ openModal, hideModal }: ModalProps) => {
  const { confirmPayment, loading } = useConfirmPayment()
  const navigation = useNavigation<NavigationProp>()
  const queryClient = useQueryClient()
  const [complete, setComplete] = useState(false)
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const mutate = useMutation(createTransaction, {
    onSuccess: () => {
      hideModal()
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
    onError: () => {
      console.log('Error')
    },
  })

  const createPaymentIntent = useMutation(createIntent, {
    onError: () => {
      Alert.alert('Thông báo', 'Khởi tạo thanh toán thất bại!')
    },
  })

  const onCheckout = async () => {
    if (!complete) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin thẻ!')
      return
    }

    const totalPrice = route.params.seats.reduce((total, seat) => total + seat.price, 0)
    const { paymentIntent: clientSecret } = await createPaymentIntent.mutateAsync({
      amount: totalPrice,
    })

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: user?.email,
          name: user?.name,
        },
      },
    })

    if (error) {
      Alert.alert('Thông báo', 'Thanh toán thất bại!')
      return
    }

    mutate.mutate({
      schedule_id: route.params.schedule_id,
      seats: route.params.seats.map((seat) => seat.id),
      user_id: user?.id as string,
      price: paymentIntent.amount,
      payment_status: 'SUCCESS',
      payment_intent_id: paymentIntent.id,
      foods: [],
    })
  }

  return (
    <Portal>
      <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Thanh toán</Text>

          <Text style={{ fontSize: 12 }}>
            Hãy nhập thông tin thẻ của bạn để thanh toán. Chúng tôi sẽ không lưu lại thông tin thẻ
          </Text>

          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{ backgroundColor: '#EFEFEF' }}
            style={{ height: 50 }}
            onCardChange={(cardDetails) => {
              setComplete(cardDetails.complete)
            }}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Button onPress={hideModal} style={styles.button}>
            ĐÓNG
          </Button>

          <Button mode="contained" style={styles.button} onPress={onCheckout} loading={loading}>
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
