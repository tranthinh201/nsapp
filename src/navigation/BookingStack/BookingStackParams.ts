import { SelectSeatType } from '@/screens/Booking'

export type BookingStackParams = {
  BOOKING_MOVIE_DETAIL: { id: string }
  BOOKING_LIST_CINEMA: { movie_id: string; name_movie: string }
  BOOKING_SEAT: { schedule_id: string; name_cinema: string }
  BOOKING_CONFIRM: {
    schedule_id: string
    seats: SelectSeatType[]
  }
  BOOKING_PAYMENT: { schedule_id: string; seats: SelectSeatType[] }
  COMMENT: { name: string; image: string; movie_id: string }
}
