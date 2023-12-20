import { z } from 'zod'

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
  created_at: z.string(),
  updated_at: z.string(),
  movie_type: MovieType,
  movie_format: MovieFormat,
})

const CinemaMovieSchema = z.object({
  cinema: z.array(Cinema),
  movie: Movie,
})

export type MovieType = z.infer<typeof MovieSchema>
export type PersonType = z.infer<typeof PersonSchema>
export type MovieImageType = z.infer<typeof MovieImageSchema>
export type CinemaMovieType = z.infer<typeof CinemaMovieSchema>
export type CinemaType = z.infer<typeof Cinema>
