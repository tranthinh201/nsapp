import QrCode from '@/assets/img/qr-code.png'
import { getUnCheckTicket } from '@/libs/api/ticket'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { Ticket } from '@/libs/types/movie'
import { RootStore } from '@/store'
import { convertDateToHour } from '@/utils/date'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { MyMovieNotFound } from './MyMovieNotFound'

const MyTicket = () => {
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data, isFetching } = useQuery(
    ['myTicket'],
    () => getUnCheckTicket({ id: user?.id as string }),
    {
      enabled: !!user?.id,
    },
  )

  const renderItem = ({ item }: { item: Ticket }) => {
    return (
      <View style={styles.ticket}>
        <Image source={QrCode} style={{ width: 100, height: 100 }} />

        <View>
          <Text style={{ fontWeight: '700' }}>{item.schedule.movie.name}</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text>{convertDateToHour(item.schedule.start_time)}</Text>
            <Text> - </Text>
            <Text>{convertDateToHour(item.schedule.end_time)}</Text>
          </View>

          <Text>{item.schedule.screen.name}</Text>
        </View>
      </View>
    )
  }

  const loading = <Text>Loading...</Text>

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
