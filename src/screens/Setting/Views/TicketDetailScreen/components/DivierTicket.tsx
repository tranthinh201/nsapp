import { useAppTheme } from '@/libs/config/theme'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const DividerTicket = () => {
  const { colors } = useAppTheme()

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          bottom: -12,
          borderRadius: 100,
          left: -10,
          backgroundColor: colors.textGray,
        }}
      >
        <View
          style={{
            width: 19,
            height: 20,
            backgroundColor: 'white',
            borderTopRightRadius: 100,
            borderBottomEndRadius: 100,
          }}
        />
      </View>

      <Text
        style={{
          color: colors.textGrey,
          position: 'absolute',
          bottom: -18,
          height: 25,
          left: 15,
          right: 15,
          fontWeight: '500',
        }}
      >
        ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー ー
      </Text>

      <View
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          backgroundColor: colors.textGray,
          bottom: -12,
          borderRadius: 100,
          right: -10,
          alignItems: 'flex-end',
        }}
      >
        <View
          style={{
            width: 19,
            height: 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 100,
            borderBottomStartRadius: 100,
          }}
        />
      </View>
    </View>
  )
}

export { DividerTicket }
