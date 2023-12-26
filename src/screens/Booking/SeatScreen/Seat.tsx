import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { SeatTypeData } from '../constant'
import { BookingType, SeatType, SelectSeatType } from '../types'

type SeatProps = {
  data: BookingType
  seats: SelectSeatType[]
  handleSelectSeat: (seat: SelectSeatType) => void
}

const Seat = ({ data, seats, handleSelectSeat }: SeatProps) => {
  const filterSeatTypeStyle = (seat: SeatType, styleType: 'bg' | 'text') => {
    if (seats.find((item) => item.id === seat.id)) {
      return styleType === 'bg' ? { backgroundColor: '#ED4C67' } : { color: '#fff' }
    }

    return SeatTypeData.find((item) => item.type === seat.seat_type)?.style
  }

  const { colors } = useAppTheme()

  return (
    <View>
      <View style={{ marginBottom: 30 }}>
        {data?.seats.map((item, index) => {
          return (
            <View
              key={index}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
            >
              {item?.map((item) => {
                return (
                  <>
                    {item.is_booked ? (
                      <View key={item.id} style={[styles.seat, { backgroundColor: 'gray' }]}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.background,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.seat,
                          {
                            ...filterSeatTypeStyle(item, 'bg'),
                          },
                        ]}
                        onPress={() =>
                          handleSelectSeat({
                            id: item.id,
                            name: item.name,
                            price:
                              item.seat_type === 'NORMAL'
                                ? data.schedule.movie.ticket_price
                                : 10000 + data.schedule.movie.ticket_price,
                          })
                        }
                      >
                        <Text
                          style={{
                            ...filterSeatTypeStyle(item, 'text'),
                            fontSize: 12,
                          }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )
              })}
            </View>
          )
        })}
      </View>

      <Divider />

      <View style={styles.seatTypeContainer}>
        <FlashList
          data={SeatTypeData}
          renderItem={({ item }) => (
            <View style={styles.seatType}>
              <View style={{ ...item.style, width: 12, height: 12 }} />

              <Text style={textStyles.text10}>{item.name}</Text>
            </View>
          )}
          estimatedItemSize={100}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export { Seat }

const styles = StyleSheet.create({
  seat: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 6,
  },
  seatTypeContainer: { height: 80, width: '100%', padding: 10 },
  seatType: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5,
  },
})
