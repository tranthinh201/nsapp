import { z } from 'zod'

export const InformationSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  phone_number: z.string().min(1, { message: 'Phone number is required' }),
  birthday: z.date().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
})

export type InformationType = z.infer<typeof InformationSchema>
