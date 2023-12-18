import StarSvg from '@/assets/svg/star.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'

type MovieItemProps = {
  id: string
  image: string
  name: string
  category: string
  rating: number
  totalRating: number
  onPress: () => void
}

const MovieItem = ({ image, name, category, rating, totalRating, id }: MovieItemProps) => {
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()

  const handleMoveToDetail = () => {
    navigation.navigate('MovieStack', { screen: 'MOVIE_DETAIL', params: { id } })
  }

  return (
    <TouchableOpacity style={{ width: 160 }} onPress={handleMoveToDetail}>
      <Image
        source={{
          uri: image
            ? image
            : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
        }}
        height={220}
        width={160}
        style={{
          borderRadius: 8,
        }}
      />

      <View style={{ alignItems: 'center', flex: 1, padding: 4 }}>
        <Text style={{ fontSize: 13, fontWeight: '700' }}>{name}</Text>

        <Text style={{ ...textStyles.text12, color: colors.grey }}>{category}</Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 2,
          }}
        >
          <StarSvg width={14} height={14} />

          <Text style={{ ...textStyles.text12, fontWeight: '700', marginHorizontal: 4 }}>
            {rating}/10
          </Text>

          <Text style={textStyles.text12}>({totalRating} đánh giá)</Text>
        </View>

        <Button
          mode="outlined"
          style={{
            borderRadius: 10,
            marginTop: 6,
          }}
          labelStyle={{ fontSize: 12 }}
        >
          ĐĂT VÉ
        </Button>
      </View>
    </TouchableOpacity>
  )
}

export { MovieItem }
