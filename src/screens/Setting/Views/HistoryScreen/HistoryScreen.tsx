import { getHistoryTicket } from '@/libs/api/ticket'
import { Header } from '@/libs/components'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { convertDateToWeekDayHour } from '@/utils/date'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { truncate } from 'lodash'
import { Image } from 'moti'
import { Pressable, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const HistoryScreen = () => {
  const { data } = useQuery(['history'], getHistoryTicket)
  const navigation = useNavigation<NavigationProp>()

  return (
    <>
      <Header title="Lịch sử" />

      <ScrollView>
        <View style={{ gap: 10, marginHorizontal: 15, paddingVertical: 10 }}>
          {data?.map((item) => (
            <Pressable
              key={item.id}
              style={styles.ticket}
              onPress={() =>
                navigation.navigate('ProfileStack', {
                  screen: 'TICKET_DETAIL',
                  params: { id: item.id },
                })
              }
            >
              <Image
                source={{ uri: item.schedule.movie_image }}
                width={80}
                height={80}
                style={{ borderRadius: 8 }}
              />

              <View style={{ gap: 4 }}>
                <Text style={styles.movie_name}>
                  {truncate(item.schedule.movie_name, { length: 35 })}
                </Text>

                <Text style={textStyles.text12}>
                  {truncate(item.schedule.cinema_address, { length: 40 })}
                </Text>

                <Text style={textStyles.text12}>
                  {convertDateToWeekDayHour(item.schedule.start_time)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export { HistoryScreen }

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 8,
  },
  movie_name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
