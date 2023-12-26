import { useAppTheme } from '@/libs/config/theme'
import { RouteBookingStackType } from '@/libs/route'
import { RootStore } from '@/store'
import { convertDate, convertDateToHour } from '@/utils/date'
import { useRoute } from '@react-navigation/native'
import { isEqual } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { BookingType } from '../types'

type DetailPaymentProps = {
  data: BookingType
}

const DetailPayment = ({ data }: DetailPaymentProps) => {
  const { colors } = useAppTheme()
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const movieName = data?.schedule.movie.name
  const showTime = `${convertDate(data?.schedule?.start_time as string)} - ${convertDateToHour(
    data?.schedule.start_time as string,
  )}`
  const cinemaName = data?.cinema.name
  const seatNames = route.params.seats.map((seat) => seat.name).join(', ')
  const userName = user?.last_name + ' ' + user?.name
  const userEmail = user?.email
  const userPhone = '0123456789'
  const totalPrice = route.params.seats
    .map((seat) => seat.price)
    .reduce((a, b) => a + b, 0)
    .toLocaleString('vi-VN')

  const infoBill = [
    { name: 'Dịch vụ', value: 'Mua vé xem phim' },
    { name: 'Phim', value: movieName },
    { name: 'Suất chiếu', value: showTime },
    { name: 'Rạp', value: cinemaName },
    { name: 'Tổng tiền', value: totalPrice },
    { name: 'Ghế', value: seatNames },
    { name: 'Người đặt', value: userName },
    { name: 'Email', value: userEmail },
    { name: 'Số điện thoại', value: userPhone },
  ]

  return (
    <View
      style={{
        borderColor: colors.primary,
        padding: 15,
        borderWidth: 1,
        margin: 15,
        borderRadius: 6,
        backgroundColor: '#FFF',
      }}
    >
      {infoBill.map((item, index) => (
        <View key={index} style={styles.list}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.textGrey }}>{item.name}</Text>

            <Text style={{ fontWeight: '700' }}>{item.value}</Text>
          </View>
        </View>
      ))}

      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.textGrey }}>Tạm tính</Text>

          <Text style={{ fontWeight: '600' }}>{totalPrice}đ</Text>
        </View>
      </View>
    </View>
  )
}

export { DetailPayment }

const styles = StyleSheet.create({
  list: {
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 0.5,
  },
})
