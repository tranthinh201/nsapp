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
  time: z.date(),
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

export type MovieType = z.infer<typeof MovieSchema>
export type PersonType = z.infer<typeof PersonSchema>
export type MovieImageType = z.infer<typeof MovieImageSchema>
