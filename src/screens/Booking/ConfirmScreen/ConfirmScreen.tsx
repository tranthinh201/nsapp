import { getSeatMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { RouteBookingStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { InformationMovie } from './InformationMovie'
import { InformationUser } from './InformationUser'
import { ListFood } from './ListFood'

const ConfirmScreen = () => {
  const route = useRoute<RouteBookingStackType<'BOOKING_CONFIRM'>>()

  const { data, isLoading } = useQuery(
    ['schedule', route.params.schedule_id],
    () => getSeatMovie(route.params.schedule_id),
    {
      enabled: !!route.params.schedule_id,
      keepPreviousData: true,
    },
  )

  return (
    <>
      <Header title="Thông tin thanh toán" />

      {isLoading ? (
        <View>
          <Text>JJJSS</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            {data && <InformationMovie screen={data} seats={route.params.seats} />}

            <ListFood />

            <InformationUser />
          </ScrollView>

          <View style={styles.button}>
            <Button mode="contained" style={{ borderRadius: 10 }}>
              TIẾP TỤC
            </Button>
          </View>
        </>
      )}
    </>
  )
}

export { ConfirmScreen }

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
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
  },
})
