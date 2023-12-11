import BillBoardFocusedSvg from '@/assets/svg/billboard-focused.svg'
import BillBoardSvg from '@/assets/svg/billboard.svg'
import ComingSoonFocusedSvg from '@/assets/svg/coming-soon-focused.svg'
import ComingSoonSvg from '@/assets/svg/coming-soon.svg'
import FoodFocusedSvg from '@/assets/svg/food-focused.svg'
import FoodSvg from '@/assets/svg/food.svg'
import SettingFocusedSvg from '@/assets/svg/setting-focused.svg'
import SettingSvg from '@/assets/svg/setting.svg'
import { useAppTheme } from '@/libs/config/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BOTTOM_TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import { TabComingSoon } from './TabComingSoon'
import { TabFood } from './TabFood'
import { TabHome } from './TabHome'
import { TabSetting } from './TabSetting'

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
            <BillBoardFocusedSvg width={20} height={20} />
          ) : (
            <BillBoardSvg width={20} height={20} />
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
            <ComingSoonFocusedSvg width={20} height={20} />
          ) : (
            <ComingSoonSvg width={20} height={20} />
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
          focused ? <FoodFocusedSvg width={20} height={20} /> : <FoodSvg width={20} height={20} />,
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_SETTING,
      component: TabSetting,
      options: {
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <SettingFocusedSvg width={20} height={20} />
          ) : (
            <SettingSvg width={20} height={20} />
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
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily: 'Itim-Regular',
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export { BottomTabs }
