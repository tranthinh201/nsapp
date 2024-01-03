import { useAppTheme } from '@/libs/config/theme'
import { View } from 'moti'
import { Text } from 'react-native-paper'

const WarnPayment = () => {
  const { colors } = useAppTheme()

  return (
    <View
      style={{
        marginHorizontal: 15,
        borderRadius: 8,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.error,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontWeight: '700',
          fontSize: 12,
        }}
      >
        Lưu ý:
      </Text>

      <Text style={{ fontSize: 12, color: colors.textGray }}>
        - Không thể hủy vé trước giờ chiếu 1 ngày.
      </Text>

      <Text style={{ fontSize: 12, color: colors.textGray }}>
        - Khi được yêu cầu, vui lòng xuất trình giấy tờ tùy thân để chứng thực độ tuổi khi xem phim
      </Text>
    </View>
  )
}

export { WarnPayment }
