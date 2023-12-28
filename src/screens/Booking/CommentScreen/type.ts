import { TypeOf, z } from 'zod'

export const CommentInputSchema = z.object({
  user_id: z.string(),
  movie_id: z.string(),
  content: z.string(),
  star: z.number().min(1).max(10),
  image: z.string().array().optional(),
  feeling: z.string().array().optional(),
})

export type CommentInput = TypeOf<typeof CommentInputSchema>
