import { SCREENS_KEY } from '@/navigation/preset'
import { ChangePasswordScreen, InformationScreen, ListSetting } from '@/screens/Setting'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SettingStackParams } from './SettingStackParams'

const SettingScreens = [
  {
    name: SCREENS_KEY.SETTING.INDEX,
    component: ListSetting,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.SETTING.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.SETTING.INFORMATION,
    component: InformationScreen,
    options: { headerShown: false },
  },
]

const HomeStack = createStackNavigator<SettingStackParams>()

export function TabSetting() {
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
