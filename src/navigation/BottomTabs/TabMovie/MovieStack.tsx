import { SCREENS_KEY } from '@/navigation/preset'
import { MovieScreen } from '@/screens/Movie'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { MovieStackParams } from './MovieStackParams'

const MovieScreens = [
  {
    name: SCREENS_KEY.MOVIE.INDEX,
    component: MovieScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<MovieStackParams>()

export function TabMovie() {
  return (
    <Stack.Navigator>
      {MovieScreens.map((child) => (
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
