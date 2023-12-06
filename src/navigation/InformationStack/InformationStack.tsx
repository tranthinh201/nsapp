import { ChangePasswordScreen, InformationScreen } from '@/screens/Profile'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { InformationStackParamsList } from './InformationStackParams'

const Information = [
  {
    name: SCREENS_KEY.INFORMATION.INDEX,
    component: InformationScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.ABOUT_APP.INDEX,
    component: ChangePasswordScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.CHANGE_PASSWORD.INDEX,
    component: ChangePasswordScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<InformationStackParamsList>()

export function InformationStack() {
  return (
    <Stack.Navigator>
      {Information.map((child) => (
        <Stack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </Stack.Navigator>
  )
}
