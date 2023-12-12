import { MovieDetail } from '@/screens/Movie/MovieDetail'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { MovieStackParams } from './MovieStackParams'

const MovieScreens = [
  {
    name: SCREENS_KEY.MOVIE_DETAIL.INDEX,
    component: MovieDetail,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<MovieStackParams>()

const MovieStack = () => {
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

export { MovieStack }
