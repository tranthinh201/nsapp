import { z } from 'zod'

export const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
})

export type FoodType = z.infer<typeof FoodSchema>
