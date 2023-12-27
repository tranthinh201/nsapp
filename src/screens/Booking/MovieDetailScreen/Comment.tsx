import StarSvg from '@/assets/svg/star.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'

const Comment = () => {
  const { colors } = useAppTheme()

  return (
    <View style={styles.root}>
      <View style={{ gap: 10, paddingHorizontal: 10 }}>
        <Text style={[textStyles.content16, { fontWeight: '700', marginBottom: 3 }]}>
          Cộng đồng xem phim nghĩ gì?
        </Text>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <StarSvg width={20} height={20} />

            <Text style={{ fontSize: 18, fontWeight: '700' }}> 8.5/10</Text>

            <Text style={{ color: colors.textGrey }}> (120 đánh giá)</Text>
          </View>

          <Pressable>
            <Text style={{ fontWeight: '700', color: colors.primary }}>Viết đánh giá</Text>
          </Pressable>
        </View>

        <View style={{ borderWidth: 1, borderRadius: 6, borderColor: colors.divider }}>
          <View style={{ paddingVertical: 10, gap: 4, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
              <Avatar.Text size={25} label="TT" />

              <View>
                <Text style={{ fontWeight: '700', fontSize: 12 }}>Thịnh Trần</Text>

                <Text style={{ color: colors.textGrey, fontSize: 12 }}>Thành viên từ 2021</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <StarSvg width={16} height={16} />

              <Text style={{ fontWeight: '700' }}> 8.5/10 - Cực phẩm</Text>
            </View>

            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, saepe sequi. Vel
              nulla quisquam perspiciatis omnis error numquam incidunt dicta reprehenderit sunt,
              eius vitae laboriosam, quo non aliquid dolor natus?
            </Text>
          </View>
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
})
