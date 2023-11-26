import { SCREENS_KEY } from '@/navigation/preset'
import { HomeScreen } from '@/screens/Home'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeStackParams } from './HomeStackParams'

const HomeScreens = [
  {
    name: SCREENS_KEY.HOME.INDEX,
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.HOME.MEW,
    component: HomeScreen,
    options: { headerShown: true },
  },
]

const HomeStack = createStackNavigator<HomeStackParams>()

export default function TabHome() {
  return (
    <HomeStack.Navigator>
      {HomeScreens.map((child) => (
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
