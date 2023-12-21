export type BookingStackParams = {
  BOOKING_MOVIE_DETAIL: { id: string }
  BOOKING_LIST_CINEMA: { movie_id: string; name_movie: string }
  BOOKING_SEAT: { schedule_id: string; name_cinema: string }
}
