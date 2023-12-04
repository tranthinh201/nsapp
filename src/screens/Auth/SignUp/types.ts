import { z } from 'zod'

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, { message: 'First name must be at least 1 characters' }),
    last_name: z.string().min(1, { message: 'Last name must be at least 1 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email must be at least 1 characters' })
      .email({ message: 'Email is invalid' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password and confirm password must be the same',
    path: ['confirm_password'],
  })

export type SignUpType = z.infer<typeof SignUpSchema>
