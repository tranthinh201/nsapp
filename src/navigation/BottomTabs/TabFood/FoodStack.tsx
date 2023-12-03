import { SCREENS_KEY } from '@/navigation/preset'
import { HomeScreen } from '@/screens/Home'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FoodStackParams } from './FoodStackParams'

const FoodScreens = [
  {
    name: SCREENS_KEY.FOOD.INDEX,
    component: HomeScreen,
    options: { headerShown: false },
  },
]

const FoodStack = createStackNavigator<FoodStackParams>()

export function TabFood() {
  return (
    <FoodStack.Navigator>
      {FoodScreens.map((child) => (
        <FoodStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </FoodStack.Navigator>
  )
}
