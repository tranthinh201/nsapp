import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { StyleSheet, View } from 'react-native'
import { List, Text } from 'react-native-paper'
import { CinemaMovieType } from '../types'
import { Cinema } from './Cinema'

type ListCinemaProps = {
  data: CinemaMovieType
}

const ListCinema = ({ data }: ListCinemaProps) => {
  const { colors } = useAppTheme()

  return (
    <>
      {data.cinema.length <= 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>KHÔNG CÓ RẠP NÀO CẢ</Text>
        </View>
      ) : (
        <View style={styles.root}>
          <Text style={[{ color: colors.primary, fontWeight: '700' }, textStyles.text18]}>
            Rạp đề xuất ({data.cinema.length})
          </Text>

          <View style={styles.root}>
            <List.AccordionGroup>
              {data.cinema.map((cinema, index) => (
                <Cinema cinema={cinema} movie_format={data.movie.movie_format.name} key={index} />
              ))}
            </List.AccordionGroup>
          </View>
        </View>
      )}
    </>
  )
}

export { ListCinema }

const styles = StyleSheet.create({
  root: { backgroundColor: '#fff', borderRadius: 6, marginTop: 12, padding: 12 },
  container: { padding: 10 },
})
