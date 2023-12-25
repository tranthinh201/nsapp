import { TypeOf, z } from 'zod'

export const SearchSchema = z.object({
  keyword: z.string().trim().optional(),
})

export type SearchType = TypeOf<typeof SearchSchema>
