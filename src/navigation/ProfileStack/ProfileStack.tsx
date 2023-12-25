import { ChangePasswordScreen, InformationScreen } from '@/screens/Setting'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { ProfileStackParams } from './ProfileStackParams'

const ProfileScreens = [
  {
    name: SCREENS_KEY.INFORMATION.INDEX,
    component: InformationScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.CHANGE_PASSWORD.INDEX,
    component: ChangePasswordScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<ProfileStackParams>()

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      {ProfileScreens.map((child) => (
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

export { ProfileStack }
