import { RootStore } from '@/store'
import { isEqual } from 'lodash'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { AuthSetting } from './components/AuthSetting'
import { UnAuthSetting } from './components/UnAuthSetting'

const SettingScreen = () => {
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  return <Animated.ScrollView>{user ? <AuthSetting /> : <UnAuthSetting />}</Animated.ScrollView>
}

export { SettingScreen }
