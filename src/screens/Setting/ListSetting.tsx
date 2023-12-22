import Banner from '@/assets/img/banner.png'
import AvatarDefault from '@/assets/img/user.png'
import CommentSvg from '@/assets/svg/comment.svg'
import EyeSvg from '@/assets/svg/eye-movie.svg'
import StarSvg from '@/assets/svg/star-one.svg'
import TicketSvg from '@/assets/svg/ticket.svg'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { RootStore } from '@/store'
import { FlashList } from '@shopify/flash-list'
import { isEqual } from 'lodash'
import { View } from 'moti'
import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const ListSetting = () => {
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const insets = useSafeAreaInsets()
  const dimensions = Dimensions.get('window')

  return (
    <Animated.ScrollView>
      <View style={{ zIndex: -1 }}>
        <Image
          source={Banner}
          style={{
            width: dimensions.width,
            height: 200,
            resizeMode: 'cover',
          }}
        />
      </View>

      <View
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          width: dimensions.width,
          backgroundColor: colors.background,
          marginTop: -20,
          minHeight: dimensions.height - 200 - insets.top,
        }}
      >
        <View>
          <View style={{ display: 'flex', alignItems: 'center', marginTop: -40 }}>
            <Image
              style={[styles.avatar]}
              source={user?.avatar ? { uri: user.avatar } : AvatarDefault}
            />

            <Text style={[textStyles.text16, { fontWeight: '700' }]}>{user?.name}</Text>
          </View>

          <View style={{ height: 300, padding: 20 }}>
            <FlashList
              data={[
                {
                  title: 'Vé đã mua',
                  icon: <TicketSvg width={25} height={25} />,
                  route: 'Order',
                },
                {
                  title: 'Phim đã xem',
                  icon: <EyeSvg width={25} height={25} />,
                  route: 'Order',
                },
                {
                  title: 'Đánh giá',
                  icon: <StarSvg width={25} height={25} />,
                  route: 'Order',
                },
                {
                  title: 'Bình luận',
                  icon: <CommentSvg width={25} height={25} />,
                  route: 'Order',
                },
              ]}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      width: dimensions.width / 4 - 20,
                      marginRight: 10,
                    }}
                  >
                    {item.icon}

                    <Text style={textStyles.text12}>{item.title}</Text>
                  </View>
                )
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={100}
            />
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  )
}

export { ListSetting }

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
})
