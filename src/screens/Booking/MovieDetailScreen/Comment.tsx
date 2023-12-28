import StarSvg from '@/assets/svg/star.svg'
import { useAppTheme } from '@/libs/config/theme'
import { LIST_REVIEW } from '@/libs/constants'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { MovieType } from '../types'

type CommentProps = {
  movie: MovieType
}

const Comment = ({ movie }: CommentProps) => {
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()
  const handleMoveToComment = () =>
    navigation.navigate('BookingStack', {
      screen: 'COMMENT',
      params: {
        image: movie.movie_image.map((img) => img.path)[0],
        name: movie.name,
        movie_id: movie.id,
      },
    })

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={[textStyles.content16, { fontWeight: '700', marginBottom: 3 }]}>
          Cộng đồng xem phim nghĩ gì?
        </Text>

        <View style={styles.label}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <StarSvg width={20} height={20} />

            <Text style={{ fontSize: 18, fontWeight: '700' }}> 8.5/10</Text>

            <Text style={{ color: colors.textGrey }}> (120 đánh giá)</Text>
          </View>

          <Pressable onPress={handleMoveToComment}>
            <Text style={{ fontWeight: '700', color: colors.primary }}>Viết đánh giá</Text>
          </Pressable>
        </View>

        <View style={{ borderWidth: 1, borderRadius: 6, borderColor: colors.divider }}>
          {movie.comment.map((item) => {
            const isLastItem = item.id === movie.comment[movie.comment.length - 1].id

            return (
              <View
                style={[
                  styles.comment,
                  {
                    borderBottomColor: isLastItem ? colors.background : colors.divider,
                  },
                ]}
                key={item.id}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                  <Avatar.Text size={25} label="TT" />

                  <View>
                    <Text style={{ fontWeight: '700', fontSize: 12 }}>Thịnh Trần</Text>

                    <Text style={{ color: colors.textGrey, fontSize: 12 }}>Thành viên từ 2021</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', columnGap: 5 }}>
                  <StarSvg width={16} height={16} />

                  <Text style={{ fontWeight: '700' }}>
                    {item.star}/10 - {LIST_REVIEW[item.star - 1]}
                  </Text>
                </View>

                <Text style={{ paddingVertical: 5 }}>{item.content}</Text>

                {item.feeling && (
                  <FlashList
                    data={item.feeling}
                    renderItem={({ item: felling, index }) => {
                      return (
                        <View
                          style={{
                            backgroundColor: '#dfe6e9',
                            borderRadius: 12,
                            marginRight: 8,
                          }}
                          key={felling}
                        >
                          <Text
                            style={[
                              styles.textFeel,
                              {
                                color: '#000',
                              },
                            ]}
                          >
                            {felling}
                          </Text>
                        </View>
                      )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={100}
                  />
                )}
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export { Comment }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  container: { gap: 10, paddingHorizontal: 10 },
  label: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  comment: {
    paddingVertical: 10,
    gap: 4,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  textFeel: { fontSize: 12, paddingHorizontal: 10, paddingVertical: 3 },
  feel: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, columnGap: 10 },
})
