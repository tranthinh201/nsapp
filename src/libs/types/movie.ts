export type Seat = {
  id: string
  ticket_id: string
  seat_id: string
  created_at: string
  updated_at: string
}

export type Movie = {
  id: string
  name: string
  national: string
  released_date: string
  language_movie: string
  duration: number
  limit_age: string
  brief_movie: string
  trailer_movie: string
  is_deleted: boolean
  movie_type_id: string
  movie_format_id: string
  ticket_price: number
  created_at: string
  updated_at: string
}

export type Screen = {
  id: string
  cinema_id: string
  name: string
  column_size: number
  row_size: number
  created_at: string
  updated_at: string
}

export type Schedule = {
  id: string
  start_time: string
  end_time: string
  screen_id: string
  movie_id: string
  created_at: string
  updated_at: string
  movie: Movie
  screen: Screen
}

export type Ticket = {
  id: string
  user_id: string
  food_id: string | null
  schedule_id: string
  price: number
  is_checkin: boolean
  status: string
  payment_type: string
  created_at: string
  updated_at: string
  seats: Seat[]
  schedule: Schedule
}
