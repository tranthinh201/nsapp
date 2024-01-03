import { createComment } from '@/libs/api/comment'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { LIST_FEELING, LIST_REVIEW } from '@/libs/constants'
import { RouteBookingStackType } from '@/libs/route'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { AirbnbRating } from 'react-native-ratings'
import { useSelector } from 'react-redux'
import { CommentInput } from './type'

export type ListMediaType = {
  type: 'image' | 'video'
  path: string
}

const CommentScreen = () => {
  const route = useRoute<RouteBookingStackType<'COMMENT'>>()
  const { colors } = useAppTheme()
  const [rating, setRating] = React.useState(0)
  const [felling, setFelling] = React.useState<string[]>([])
  const navigation = useNavigation<NavigationProp>()
  const isUnRated = rating === 0
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInput>({
    defaultValues: {
      star: 0,
      content: '',
      image: [],
      feeling: [],
      movie_id: route.params.movie_id,
      user_id: user?.id,
    },
  })

  const handleSetFelling = (item: string) => {
    setFelling((prevFelling) => {
      if (prevFelling.includes(item)) {
        return prevFelling.filter((i) => i !== item)
      }

      return [...prevFelling, item]
    })
  }

  const mutation = useMutation(createComment, {
    onSuccess: () => {
      navigation.navigate('BookingStack', {
        screen: 'BOOKING_MOVIE_DETAIL',
        params: {
          id: route.params.movie_id,
        },
      })
    },
    onError: () => {
      Alert.alert('Không tạo được comment')
    },
  })

  const onSubmit = (data: CommentInput) => {
    mutation.mutate({
      content: data.content,
      feeling: felling,
      image: data.image,
      movie_id: route.params.movie_id,
      star: rating,
      user_id: user?.id as string,
    })
  }

  return (
    <>
      <Header title="Viết đánh giá" />

      <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
        <View style={[styles.movie, { borderBottomColor: colors.divider }]}>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: colors.divider,
              padding: 0.5,
              borderRadius: 5,
            }}
          >
            <Image source={{ uri: route.params.image }} style={styles.image} />
          </View>

          <View>
            <Text style={{ fontWeight: '700' }}>{route.params.name}</Text>

            <Text style={textStyles.text12}>Kinh dị</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <View style={[styles.listStar, { borderBottomColor: colors.divider }]}>
            {isUnRated && (
              <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                Nhấp vào ngôi sao để đánh giá
              </Text>
            )}

            <AirbnbRating
              ratingContainerStyle={{ marginTop: isUnRated ? -25 : 0 }}
              count={10}
              reviews={LIST_REVIEW}
              defaultRating={0}
              size={22}
              reviewColor="black"
              starContainerStyle={{ gap: 5 }}
              reviewSize={18}
              onFinishRating={(star) => {
                setRating(star)
              }}
            />
          </View>

          <View style={[styles.mainFeel, { borderBottomColor: colors.divider }]}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>Bạn cảm thấy...</Text>

            <View style={styles.feel}>
              {LIST_FEELING.map((item, index) => {
                const isSelected = felling.find((ite) => ite === item)

                return (
                  <Pressable
                    style={{
                      backgroundColor: isSelected ? colors.background : '#dfe6e9',
                      borderRadius: 12,
                      borderColor: isSelected ? colors.primary : '#dfe6e9',
                      borderWidth: 1,
                    }}
                    onPress={() => handleSetFelling(item)}
                    key={index}
                  >
                    <Text
                      style={[
                        styles.textFeel,
                        {
                          color: isSelected ? colors.primary : '#000',
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </View>

          <View style={{ paddingVertical: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>Cảm nhận về bộ phim</Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  multiline
                  numberOfLines={20}
                  onChangeText={onChange}
                  error={!!errors?.content?.message}
                  helperText={errors?.content?.message}
                  style={{ height: 200, textAlignVertical: 'top' }}
                  placeholder="Viết cảm nhận của bạn về bộ phim"
                />
              )}
              name="content"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.button}>
        <Button
          mode="contained"
          style={{ borderRadius: 10 }}
          disabled={isUnRated}
          onPress={handleSubmit(onSubmit)}
        >
          Gửi đánh giá
        </Button>
      </View>
    </>
  )
}

export { CommentScreen }

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 22 : 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  movie: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    gap: 10,
    borderBottomWidth: 0.6,
  },
  image: { borderRadius: 4, width: 40, height: 40 },
  listStar: { paddingVertical: 20, borderBottomWidth: 1 },
  mainFeel: {
    paddingVertical: 20,
    gap: 10,
    borderBottomWidth: 1,
  },
  feel: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, columnGap: 10 },
  textFeel: { fontSize: 12, paddingHorizontal: 10, paddingVertical: 3 },
})
