import { getDetailTicket } from '@/libs/api/ticket'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteProfileStackType } from '@/libs/route'
import { textStyles } from '@/libs/styles'
import { RootStore } from '@/store'
import { convertDateToHour, convertDateToYear, convertTimeTransaction } from '@/utils/date'
import { formatNumberVND } from '@/utils/format'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { isEqual, truncate } from 'lodash'
import { Image } from 'moti'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import { useSelector } from 'react-redux'
import { DividerTicket } from './components'
import { ModalCancellationTicket } from './components/ModalCancellationTicket'
import { ModalQrCode } from './components/ModalQrCode'

const TicketDetailScreen = () => {
  const route = useRoute<RouteProfileStackType<'TICKET_DETAIL'>>()
  const [openModal, setOpenModal] = useState(false)
  const [openModalTicket, setOpenModalTicket] = useState(false)
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data, isFetching } = useQuery({
    queryKey: ['ticketDetail', route.params.id, user?.id],
    queryFn: () => getDetailTicket({ id: route.params.id }),
    enabled: !!user?.id && !!route.params.id,
  })

  const qrCodeValue = JSON.stringify({
    ticket_id: data?.id,
    user_id: user?.id,
    schedule_id: data?.schedule_id,
    seat_id: data?.tickets.map((ticket) => {
      return { id: ticket.ticket_id, name: ticket.seat_name }
    }),
  })

  const isStartTimeBefore24hour = () => {
    const now = new Date()
    const startTime = new Date(data?.schedule.start_time as string)
    const diff = startTime.getTime() - now.getTime()
    const diffHours = Math.ceil(diff / (1000 * 60 * 60))
    return diffHours < 24
  }

  if (isFetching)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    )

  return (
    <>
      <View style={{ backgroundColor: colors.background, flex: 1, paddingBottom: 20 }}>
        <Header title="Thông tin vé xem phim" />

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={{ uri: data?.schedule.cinema_image }} width={30} height={30} />

              <View>
                <Text style={{ fontWeight: '500', fontSize: 12 }}>
                  {data?.schedule.cinema_name}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{data?.schedule.movie_name}</Text>
                <Text style={textStyles.text12}>
                  {data?.schedule.movie_format} {data?.schedule.movie_language}
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: data?.schedule.movie_image }}
              style={{ width: '100%', height: 200 }}
            />

            <View style={styles.detailContainer}>
              <View style={styles.detailContent}>
                <View style={{ gap: 10 }}>
                  <View style={{ gap: 4 }}>
                    <Text style={{ color: colors.textGray }}>Mã đặt vé: </Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', maxWidth: 200 }}>
                      {data?.id}
                    </Text>
                  </View>

                  <View style={{ gap: 3 }}>
                    <Text style={{ color: colors.textGray }}>Thời gian:</Text>

                    <Text style={{ fontWeight: '600', fontSize: 16, color: colors.primary }}>
                      {convertDateToHour(data?.schedule.start_time as string)}-
                      {convertDateToHour(data?.schedule.end_time as string)}
                    </Text>

                    <Text style={{ fontWeight: '500', fontSize: 16 }}>
                      {convertDateToYear(data?.schedule.start_time as string)}
                    </Text>
                  </View>
                </View>

                <View>
                  <Pressable
                    style={{ backgroundColor: colors.background, padding: 10, borderRadius: 8 }}
                    onPress={() => setOpenModal(true)}
                  >
                    <QRCode value={qrCodeValue} />
                  </Pressable>
                </View>
              </View>

              <Text style={[styles.warnText, { color: colors.textGray }]}>
                Đưa mã này cho nhân viên soát vé để vào rạp
              </Text>

              <DividerTicket />
            </View>

            <View
              style={[
                styles.room,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.divider,
                },
              ]}
            >
              <View
                style={[
                  styles.infoSeat,
                  {
                    borderColor: colors.divider,
                  },
                ]}
              >
                <View style={{ gap: 5 }}>
                  <Text style={{ color: colors.textGray }}>Phòng chiếu</Text>

                  <Text style={{ fontWeight: '600' }}>{data?.schedule.screen_name}</Text>
                </View>

                <View style={{ gap: 5 }}>
                  <Text style={{ color: colors.textGray }}>Số vé</Text>

                  <Text style={{ fontWeight: '600' }}>0{data?.tickets.length}</Text>
                </View>

                <View style={{ gap: 5 }}>
                  <Text style={{ color: colors.textGray }}>Số ghế</Text>

                  <Text style={{ fontWeight: '600', width: 100 }}>
                    {data?.tickets.map((ticket) => ticket.seat_name).join(', ')}
                  </Text>
                </View>
              </View>

              <View>
                <View style={{ gap: 5 }}>
                  <Text style={{ color: colors.textGray }}>Rạp chiếu</Text>

                  <Text style={{ fontWeight: '500' }}>{data?.schedule.cinema_name}</Text>

                  <Text>{data?.schedule.cinema_address}</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.infoTransaction,
                {
                  borderColor: colors.divider,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ color: colors.textGray }}>Tổng tiền</Text>

                <Text style={{ color: colors.textGray, fontSize: 20, fontWeight: '700' }}>
                  {formatNumberVND(data?.price as number)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ color: colors.textGray }}>Mã giao dịch</Text>

                <Text style={{ color: colors.primary }}>{truncate(data?.id)}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ color: colors.textGray }}>Thời gian giao dịch</Text>

                <Text style={{ color: colors.textGray }}>
                  {convertTimeTransaction(data?.created_at as string)}
                </Text>
              </View>
            </View>
          </View>

          {isStartTimeBefore24hour() ? (
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ textAlign: 'center', color: colors.textGray, fontSize: 12 }}>
                Bạn không thể huỷ vé trước 24h so với thời gian chiếu
              </Text>
            </View>
          ) : (
            <Button
              mode="outlined"
              style={{ borderRadius: 10, marginHorizontal: 15 }}
              onPress={() => setOpenModalTicket(true)}
            >
              Huỷ vé
            </Button>
          )}
        </ScrollView>
      </View>

      <ModalCancellationTicket
        openModal={openModalTicket}
        hideModal={() => setOpenModalTicket(false)}
        ticket_id={data?.id as string}
      />

      <ModalQrCode
        openModal={openModal}
        hideModal={() => setOpenModal(false)}
        dataQrCode={qrCodeValue}
      />
    </>
  )
}

export { TicketDetailScreen }

const styles = StyleSheet.create({
  container: { margin: 15, backgroundColor: '#dfe6e9', borderRadius: 10 },
  header: { flexDirection: 'row', padding: 15, columnGap: 10, alignItems: 'center' },
  detailContainer: { paddingTop: 20, padding: 15, gap: 25 },
  detailContent: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  warnText: { textAlign: 'center', fontSize: 12 },
  room: {
    paddingTop: 30,
    padding: 15,
    gap: 10,
    zIndex: -1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  infoSeat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  infoTransaction: {
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 15,
    gap: 10,
  },
})
