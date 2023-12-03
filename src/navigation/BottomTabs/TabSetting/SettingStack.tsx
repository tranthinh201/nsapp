import { SCREENS_KEY } from '@/navigation/preset'
import { ProfileScreen } from '@/screens/Profile'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SettingStackParams } from './SettingStackParams'

const SettingScreens = [
  {
    name: SCREENS_KEY.SETTING.INDEX,
    component: ProfileScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.SETTING.PROFILE,
    component: ProfileScreen,
    options: { headerShown: false },
  },
]

const HomeStack = createStackNavigator<SettingStackParams>()

export default function TabProfile() {
  return (
    <HomeStack.Navigator>
      {SettingScreens.map((child) => (
        <HomeStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </HomeStack.Navigator>
  )
}
