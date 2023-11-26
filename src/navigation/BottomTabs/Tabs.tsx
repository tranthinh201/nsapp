import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BOTTOM_TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import TabHome from './TabHome/HomeStack'

const Tab = createBottomTabNavigator<MainBottomTabParamList>()

type tabBarIconProps = {
  size: number
  focused: boolean
}

const BottomTabs = () => {
  const tabs = [
    {
      name: BOTTOM_TABS_KEY.TAB_HOME,
      component: TabHome,
      options: {
        title: 'Home',
        headerShown: true,
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_LIKE,
      component: TabHome,
      options: {
        title: 'LIKE',
        headerShown: true,
      },
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName={BOTTOM_TABS_KEY.TAB_HOME}
      screenOptions={{
        tabBarShowLabel: true,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  )
}

export { BottomTabs }
