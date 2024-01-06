import BillBoardFocusedSvg from '@/assets/svg/billboard-focused.svg'
import BillBoardSvg from '@/assets/svg/billboard.svg'
import ComingSoonFocusedSvg from '@/assets/svg/coming-soon-focused.svg'
import ComingSoonSvg from '@/assets/svg/coming-soon.svg'
import FoodFocusedSvg from '@/assets/svg/food-focused.svg'
import FoodSvg from '@/assets/svg/food.svg'
import HomeFocusedSvg from '@/assets/svg/home-focused.svg'
import HomeSvg from '@/assets/svg/home.svg'
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
import { TabMovie } from './TabMovie'
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
        title: 'Trang chủ',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? <HomeFocusedSvg width={30} height={30} /> : <HomeSvg width={30} height={30} />,
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_COMING_SOON,
      component: TabComingSoon,
      options: {
        title: 'Sắp chiếu',
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
      name: BOTTOM_TABS_KEY.TAB_MOVIE,
      component: TabMovie,
      options: {
        title: 'Phim',
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
      name: BOTTOM_TABS_KEY.TAB_FOOD,
      component: TabFood,
      options: {
        title: 'Bắp nước',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? <FoodFocusedSvg width={20} height={20} /> : <FoodSvg width={20} height={20} />,
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_SETTING,
      component: TabSetting,
      options: {
        title: 'Tôi',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <SettingFocusedSvg width={25} height={25} />
          ) : (
            <SettingSvg width={25} height={25} />
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
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textGray,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export { BottomTabs }
