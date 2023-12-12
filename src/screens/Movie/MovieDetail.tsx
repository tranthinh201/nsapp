import { Header } from '@/libs/components'
import { RouteMovieStackType } from '@/libs/route'
import { useRoute } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { InfoMovie } from './InfoMovie'

const MovieDetail = () => {
  const route = useRoute<RouteMovieStackType<'MOVIE_DETAIL'>>()
  const { width } = Dimensions.get('screen')

  return (
    <>
      <Header title="WONKA" />

      <ScrollView style={styles.scrollContainer}>
        <InfoMovie />
      </ScrollView>
    </>
  )
}

export { MovieDetail }

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: 'grey',
  },
})
