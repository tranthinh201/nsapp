import { getUnCheckTicket } from '@/libs/api/ticket'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { convertDateToHour } from '@/utils/date'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import { useSelector } from 'react-redux'
import { BillingType } from '../types'
import { MyMovieNotFound } from './MyMovieNotFound'

const MyTicket = () => {
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data, isFetching } = useQuery(['myTicket', user?.id], getUnCheckTicket, {
    enabled: !!user?.id,
  })

  const renderItem = ({ item }: { item: BillingType }) => {
    const qrCodeValue = JSON.stringify({
      ticket_id: item.id,
      user_id: user?.id,
      schedule_id: item.schedule_id,
      seat_id: item.tickets.map((ticket) => {
        return { id: ticket.ticket_id, name: ticket.seat_name }
      }),
    })

    return (
      <Pressable
        style={styles.ticket}
        onPress={() =>
          navigation.navigate('ProfileStack', { screen: 'TICKET_DETAIL', params: { id: item.id } })
        }
      >
        <QRCode value={qrCodeValue} />

        <View>
          <Text style={{ fontWeight: '700' }}>{item.schedule.movie_name}</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 12 }}>{convertDateToHour(item.schedule.start_time)}</Text>
            <Text> - </Text>
            <Text style={{ fontSize: 12 }}>{convertDateToHour(item.schedule.end_time)}</Text>
          </View>

          <Text style={{ fontSize: 12 }}>{item.schedule.cinema_name}</Text>

          <Text style={{ fontSize: 12 }}>{item.schedule.cinema_address}</Text>
        </View>
      </Pressable>
    )
  }

  const loading = (
    <View style={{ height: 130, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="small" />
    </View>
  )

  const flashList = (
    <View style={{ height: 130 }}>
      <FlashList
        horizontal
        data={data}
        renderItem={renderItem}
        estimatedItemSize={100}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

  const myMovieNotFound = (
    <MyMovieNotFound
      title="Hiện tại bạn chưa đặt vé nào cả"
      buttonTitle="Đặt vé ngay"
      subtitle="Đặt vé xem phim dễ dàng qua Ns Cinema"
      isNoMovie={false}
    />
  )

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.title}>
        <Text style={[textStyles.text18, { fontWeight: '700' }]}>VÉ CHƯA SỬ DỤNG</Text>

        <Text style={{ fontWeight: '700', color: colors.primary }}>Xem tất cả</Text>
      </View>

      {isFetching ? loading : data && data.length > 0 ? flashList : myMovieNotFound}
    </View>
  )
}

export { MyTicket }

const styles = StyleSheet.create({
  title: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ticket: {
    flexDirection: 'row',
    gap: 5,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
})
