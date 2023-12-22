import { textStyles } from '@/libs/styles'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider, Text } from 'react-native-paper'
import { SeatTypeData } from '../constant'
import { SeatType, SelectSeatType } from '../types'

type SeatProps = {
  seatData?: SeatType[][]
  seats: SelectSeatType[]
  handleSelectSeat: (seat: SelectSeatType) => void
}

const Seat = ({ seatData, seats, handleSelectSeat }: SeatProps) => {
  return (
    <View>
      <View style={{ marginBottom: 30 }}>
        {seatData?.map((item, index) => {
          return (
            <View
              key={index}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
            >
              {item?.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: seats.find((seat) => seat.id === item.id)
                          ? '#000'
                          : '#FFF',
                      },
                    ]}
                    onPress={() =>
                      handleSelectSeat({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: seats.find((seat) => seat.id === item.id) ? '#fff' : '#000',
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
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
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 3,
  },
  seatTypeContainer: { height: 100, width: '100%', padding: 10 },
  seatType: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5,
  },
})
