import { ListCinemaScreen, MovieDetailScreen } from '@/screens/Booking'
import { CommentScreen } from '@/screens/Booking/CommentScreen'
import { ConfirmScreen } from '@/screens/Booking/ConfirmScreen'
import { PaymentScreen } from '@/screens/Booking/PaymentScreen'
import { SeatScreen } from '@/screens/Booking/SeatScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { BookingStackParams } from './BookingStackParams'

const BookingScreens = [
  {
    name: SCREENS_KEY.BOOKING_MOVIE_DETAIL.INDEX,
    component: MovieDetailScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.BOOKING_LIST_CINEMA.INDEX,
    component: ListCinemaScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.BOOKING_SEAT.INDEX,
    component: SeatScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.BOOKING_CONFIRM.INDEX,
    component: ConfirmScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.BOOKING_PAYMENT.INDEX,
    component: PaymentScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.COMMENT.INDEX,
    component: CommentScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<BookingStackParams>()

const BookingStack = () => {
  return (
    <Stack.Navigator>
      {BookingScreens.map((child) => (
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

export { BookingStack }
