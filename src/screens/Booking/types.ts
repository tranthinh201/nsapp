import { TypeOf, z } from 'zod'

const MovieType = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

const MovieFormat = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

const Movie = z.object({
  id: z.string(),
  name: z.string(),
  national: z.string(),
  released_date: z.string(),
  language_movie: z.string(),
  duration: z.number(),
  limit_age: z.string(),
  brief_movie: z.string(),
  trailer_movie: z.string(),
  is_deleted: z.boolean(),
  movie_type_id: z.string(),
  movie_format_id: z.string(),
  ticket_price: z.number(),
  movie_image: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
  created_at: z.string(),
  updated_at: z.string(),
  movie_type: MovieType,
  movie_format: MovieFormat,
})

export const PersonSchema = z.object({
  id: z.string(),
  position_id: z.string(),
  date_of_birth: z.date(),
  name: z.string(),
  avatar: z.string(),
  biography: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const MovieImageSchema = z.object({
  id: z.string(),
  path: z.string(),
  movie_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const Comment = z.object({
  id: z.string(),
  user_id: z.string(),
  movie_id: z.string(),
  content: z.string(),
  star: z.number().min(1).max(10),
  image: z.string().array().optional(),
  feeling: z.string().array().optional(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const MovieSchema = z.object({
  id: z.string(),
  name: z.string(),
  national: z.string(),
  released_date: z.date(),
  language_movie: z.string(),
  duration: z.number(),
  limit_age: z.string(),
  brief_movie: z.string(),
  trailer_movie: z.string(),
  is_deleted: z.boolean(),
  movie_type: z.object({
    id: z.string(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
  }),
  movie_format_id: z.string(),
  movie_image: MovieImageSchema.array(),
  persons: PersonSchema.array(),
  ticket_price: z.number(),
  comment: Comment.array(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type MovieCinema = {
  id: string
  name: string
  address: string
  phone_number: string
  image: string
  created_at: Date
  updated_at: Date
}

const Screen = z.object({
  id: z.string(),
  cinema_id: z.string(),
  name: z.string(),
  column_size: z.number(),
  row_size: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

const Schedule = z.object({
  id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  screen_id: z.string(),
  movie_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  screen: Screen,
  movie: Movie,
})

const Cinema = z.object({
  id: z.string(),
  name: z.string(),
  phone_number: z.string(),
  image: z.string(),
  address: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  schedule: z.array(Schedule),
})

const CinemaMovieSchema = z.object({
  cinema: z.array(Cinema),
  movie: Movie,
})

const Seat = z.object({
  id: z.string(),
  row: z.number(),
  column: z.string(),
  is_active: z.boolean(),
  price: z.number(),
  name: z.string(),
  screen_id: z.string(),
  seat_type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_booked: z.boolean(),
})

const BookingSchema = z.object({
  id: z.string(),
  cinema_id: z.string(),
  name: z.string(),
  column_size: z.number(),
  row_size: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  cinema: Cinema,
  seats: z.array(z.array(Seat)),
  schedule: Schedule,
})

export type SelectSeatType = {
  id: string
  price: number
  name: string
}

export const CreateTransactionSchema = z.object({
  user_id: z.string(),
  schedule_id: z.string(),
  price: z.number(),
  food_id: z.string().optional(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'CANCLED']),
  payment_type: z.string(),
  seats: z.array(z.string()),
})

export type CreateTransactionType = TypeOf<typeof CreateTransactionSchema>
export type MovieType = z.infer<typeof MovieSchema>
export type PersonType = z.infer<typeof PersonSchema>
export type MovieImageType = z.infer<typeof MovieImageSchema>
export type CinemaMovieType = z.infer<typeof CinemaMovieSchema>
export type CinemaType = z.infer<typeof Cinema>
export type BookingType = z.infer<typeof BookingSchema>
export type SeatType = z.infer<typeof Seat>
export type ScheduleType = z.infer<typeof Schedule>
