import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { flexBoxStyles } from '@/libs/styles'
import { AuthUser } from '@/libs/types/auth'
import { SettingStackProps } from '@/navigation'
import { SettingStackParams } from '@/navigation/BottomTabs/TabSetting/SettingStackParams'
import { RootStore } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { isEqual } from 'lodash'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { ItemSettingType, listSetting } from './list-setting'

const ListSetting = ({ navigation }: SettingStackProps) => {
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const { dispatch } = useDispatch()

  const handleLogout = async () => {
    dispatch.auth.setUser(null as unknown as AuthUser)
    await AsyncStorage.removeItem('accessToken')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabs' }],
      }),
    )
  }

  const renderItem: ListRenderItem<ItemSettingType> = ({ item }) => {
    const handlePress = () => {
      if (item.screen_key) {
        navigation.navigate(item.screen_key as keyof SettingStackParams)
      }

      if (item.key_name_modal) {
        const title = 'Xác nhận'
        const message = 'Bạn có chắc chắn muốn đăng xuất?'

        const cancelButton = {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
        }

        const logoutButton = {
          text: 'Đăng xuất',
          onPress: handleLogout,
        }

        const buttons = [cancelButton, logoutButton]

        Alert.alert(title, message, buttons)
      }
    }

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.item, { borderBottomColor: colors.divider }]}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={flexBoxStyles.root}>
      <Header title="Cài đặt" hideHeaderLeft />

      {user && listSetting && (
        <FlashList data={listSetting} renderItem={renderItem} estimatedItemSize={100} />
      )}
    </View>
  )
}

export { ListSetting }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  touch: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 18,
    borderColor: '#545454',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  item: {
    paddingLeft: 17,
    paddingVertical: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
  },
  textModal: {
    fontSize: 20,
    lineHeight: 29,
    includeFontPadding: false,
    color: '#000',
  },
})
