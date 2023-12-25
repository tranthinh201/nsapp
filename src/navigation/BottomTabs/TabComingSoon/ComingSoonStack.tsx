import { SCREENS_KEY } from '@/navigation/preset'
import { ComingScreen } from '@/screens/Coming'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ComingSoonStackParams } from './ComingSoonStackParams'

const ComingSoonScreens = [
  {
    name: SCREENS_KEY.COMING_SOON.INDEX,
    component: ComingScreen,
    options: { headerShown: false },
  },
]

const HomeStack = createStackNavigator<ComingSoonStackParams>()

export function TabComingSoon() {
  return (
    <HomeStack.Navigator>
      {ComingSoonScreens.map((child) => (
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
