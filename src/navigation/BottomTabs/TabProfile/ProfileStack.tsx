import { SCREENS_KEY } from '@/navigation/preset'
import { HomeScreen } from '@/screens/Home'
import { ChangePasswordScreen, ProfileScreen } from '@/screens/Profile'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ProfileStackParams } from './ProfileStackParams'

const ProfileScreens = [
  {
    name: SCREENS_KEY.PROFILE.INDEX,
    component: ProfileScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.PROFILE.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.PROFILE.UPDATE,
    component: HomeScreen,
    options: { headerShown: true },
  },
]

const HomeStack = createStackNavigator<ProfileStackParams>()

export default function TabProfile() {
  return (
    <HomeStack.Navigator>
      {ProfileScreens.map((child) => (
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
