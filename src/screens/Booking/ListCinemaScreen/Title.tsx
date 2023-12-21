import ArrowDown from '@/assets/svg/arrow-down.svg'
import ArrowUp from '@/assets/svg/arrow-up.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CinemaType } from '../types'

type TitleCinemaProps = {
  cinema: CinemaType
  expanded: boolean
  handlePressExpand: () => void
}
const TitleCinema = ({ cinema, expanded, handlePressExpand }: TitleCinemaProps) => {
  const { colors } = useAppTheme()

  return (
    <Pressable style={styles.root} onPress={handlePressExpand}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[
              styles.image,
              {
                borderColor: colors.divider,
              },
            ]}
          >
            <Image
              source={{
                uri: cinema.image,
              }}
              style={{ width: 34, height: 34 }}
            />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={[{ fontWeight: '700' }, textStyles.text14]}>{cinema.name}</Text>

            <Text style={[textStyles.text10, { color: colors.textGrey }]}>Cách bạn 100m</Text>
          </View>
        </View>

        <Text style={[{ color: colors.textGrey, marginLeft: 1, marginTop: 6 }, textStyles.text10]}>
          {cinema.address}
        </Text>
      </View>

      {expanded ? <ArrowUp /> : <ArrowDown />}
    </Pressable>
  )
}

export { TitleCinema }

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
})
