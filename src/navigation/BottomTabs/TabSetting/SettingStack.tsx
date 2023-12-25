import { SCREENS_KEY } from '@/navigation/preset'
import { SettingScreen } from '@/screens/Setting'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SettingStackParams } from './SettingStackParams'

const SettingScreens = [
  {
    name: SCREENS_KEY.SETTING.INDEX,
    component: SettingScreen,
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
