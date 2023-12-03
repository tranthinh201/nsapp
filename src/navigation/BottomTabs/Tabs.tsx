import BillBoardFocusedSvg from '@/assets/svg/billboard-focused.svg'
import BillBoardSvg from '@/assets/svg/billboard.svg'
import ComingSoonFocusedSvg from '@/assets/svg/coming-soon-focused.svg'
import ComingSoonSvg from '@/assets/svg/coming-soon.svg'
import FoodFocusedSvg from '@/assets/svg/food-focused.svg'
import FoodSvg from '@/assets/svg/food.svg'
import ProfileFocusedSvg from '@/assets/svg/profile-focused.svg'
import ProfileSvg from '@/assets/svg/profile.svg'
import { useAppTheme } from '@/libs/config/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BOTTOM_TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import { TabComingSoon } from './TabComingSoon'
import { TabFood } from './TabFood'
import { TabHome } from './TabHome'
import { TabProfile } from './TabSetting'

const Tab = createBottomTabNavigator<MainBottomTabParamList>()

type tabBarIconProps = {
  size: number
  focused: boolean
}

const BottomTabs = () => {
  const { colors } = useAppTheme()

  const tabs = [
    {
      name: BOTTOM_TABS_KEY.TAB_HOME,
      component: TabHome,
      options: {
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <BillBoardFocusedSvg width={30} height={30} />
          ) : (
            <BillBoardSvg width={30} height={30} />
          ),
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_COMING_SOON,
      component: TabComingSoon,
      options: {
        title: 'Coming Soon',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <ComingSoonFocusedSvg width={30} height={30} />
          ) : (
            <ComingSoonSvg width={30} height={30} />
          ),
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_FOOD,
      component: TabFood,
      options: {
        title: 'Food',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? <FoodFocusedSvg width={30} height={30} /> : <FoodSvg width={30} height={30} />,
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
            <ProfileFocusedSvg width={30} height={30} />
          ) : (
            <ProfileSvg width={30} height={30} />
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
          options={{
            ...tab.options,
            tabBarActiveTintColor: colors.textRed,
            tabBarInactiveTintColor: colors.textGray,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#161621',
              borderTopColor: '#161621',
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export { BottomTabs }
