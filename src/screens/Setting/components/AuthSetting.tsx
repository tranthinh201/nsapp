import Banner from '@/assets/img/banner.png'
import AvatarDefault from '@/assets/img/user.png'
import CommentSvg from '@/assets/svg/comment.svg'
import EyeSvg from '@/assets/svg/eye-movie.svg'
import StarSvg from '@/assets/svg/star-one.svg'
import TicketSvg from '@/assets/svg/ticket.svg'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { isEqual } from 'lodash'
import { View } from 'moti'
import React, { useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { ModalSignOut } from './ModalSignOut'
import { MyMovieNotFound } from './MyMovieNotFound'

type DataType = {
  title: string
  icon: React.ReactNode
  route: string
}

const data = [
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
]

const AuthSetting = () => {
  const [openModal, setModal] = useState(false)
  const dimensions = Dimensions.get('screen')
  const navigation = useNavigation<NavigationProp>()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const handleToUpdateProfile = () => {
    navigation.navigate('ProfileStack', {
      screen: 'INFORMATION',
    })
  }

  const renderItem = ({ item }: { item: DataType }) => {
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
  }

  return (
    <View>
      <Image source={Banner} style={styles.bannerImage} />

      <View style={styles.main}>
        <View>
          <View style={{ display: 'flex', alignItems: 'center', marginTop: -40, gap: 5 }}>
            <Pressable onPress={handleToUpdateProfile}>
              <Image
                style={[styles.avatar]}
                source={user?.avatar ? { uri: user.avatar } : AvatarDefault}
              />
            </Pressable>

            <Text style={[textStyles.text16, { fontWeight: '700' }]}>
              {user?.last_name} {user?.name}
            </Text>
          </View>

          <View style={{ height: 80, padding: 20 }}>
            <FlashList
              data={data}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={100}
            />
          </View>
        </View>
      </View>

      <View style={styles.myMovie}>
        <MyMovieNotFound />
      </View>

      <View style={styles.logOutContainer}>
        <Button
          mode="outlined"
          style={{ borderRadius: 6 }}
          onPress={() => {
            setModal(true)
          }}
        >
          Đăng xuất
        </Button>
      </View>

      <ModalSignOut openModal={openModal} hideModal={() => setModal(false)} />
    </View>
  )
}

export { AuthSetting }

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  myMovie: { paddingHorizontal: 15, marginTop: 15 },
  logOutContainer: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  main: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#fff',
    marginTop: -20,
  },
})
