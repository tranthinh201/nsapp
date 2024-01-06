import TicketImage from '@/assets/img/ticket.png'
import SearchSvg from '@/assets/svg/search.svg'
import { listMovie } from '@/libs/api/movie'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { useQuery } from '@tanstack/react-query'
import { View } from 'moti'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider, Searchbar, Text } from 'react-native-paper'
import { MovieType } from '../Booking'
import { MovieItem } from './components/MovieItem'

const MovieScreen = () => {
  const { colors } = useAppTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [movie, setMovie] = useState<MovieType[]>([])
  const onChangeSearch = (query: string) => setSearchQuery(query)
  const { data, isFetching } = useQuery(['movie'], listMovie)

  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, isFetching])

  const handleSearchMovie = () => {
    if (searchQuery) {
      const filterMovie = data?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setMovie(filterMovie as MovieType[])
    } else {
      setMovie(data as MovieType[])
    }
  }

  const onClearSearch = () => {
    setSearchQuery('')
    setMovie(data as MovieType[])
  }

  return (
    <>
      <Header title="Phim" hideHeaderLeft />

      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: 15 }}>
            <Text>Tìm kiếm phim bạn yêu thích</Text>

            <Searchbar
              placeholder="Tìm kiếm phim ..."
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#fff',
                marginBottom: 20,
                marginTop: 5,
              }}
              placeholderTextColor={colors.placeholder}
              onIconPress={handleSearchMovie}
              icon={() => <SearchSvg width={20} height={20} />}
              onClearIconPress={onClearSearch}
            />
          </View>

          {movie.length > 0 ? (
            movie?.map((item) => {
              return (
                <View style={{ rowGap: 4, paddingBottom: 20, marginTop: 10 }} key={item.id}>
                  <MovieItem movie={item} />

                  <Divider />
                </View>
              )
            })
          ) : (
            <View style={styles.not_found}>
              <Image source={TicketImage} style={{ height: 76, width: 76 }} />

              <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Text
                  style={[
                    textStyles.content16,
                    {
                      fontWeight: '700',
                    },
                  ]}
                >
                  Không tìm thấy phim.
                </Text>

                <Text style={[textStyles.text12, { color: colors.textGray }]}>
                  Bạn hãy tìm thử phim khác nhé
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  )
}

export { MovieScreen }

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  not_found: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 6,
    height: 300,
    gap: 30,
  },
})
