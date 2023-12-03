import HomeFocusedSvg from '@/assets/svg/home-focused.svg'
import HomeSvg from '@/assets/svg/home.svg'
import ProfileFocusedSvg from '@/assets/svg/profile-focused.svg'
import ProfileSvg from '@/assets/svg/profile.svg'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BOTTOM_TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import TabHome from './TabHome/HomeStack'
import TabProfile from './TabSetting/SettingStack'

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
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? <HomeFocusedSvg width={33} height={33} /> : <HomeSvg width={33} height={33} />,
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_PROFILE,
      component: TabProfile,
      options: {
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <ProfileFocusedSvg width={33} height={33} />
          ) : (
            <ProfileSvg width={33} height={33} />
          ),
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
