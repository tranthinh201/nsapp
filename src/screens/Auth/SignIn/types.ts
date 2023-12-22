import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is field required!' })
    .email({ message: 'Email is not valid!' }),
  password: z.string().trim().min(1, { message: 'Password is field required!' }),
})

export type SignInType = z.infer<typeof SignInSchema>

export type UserType = {
  id: string
  first_name: string
  email: string
  email_verified?: Date
  avatar: string
  phone_number: string
  last_name: string
}

export type PayloadType = {
  refresh_token: string
  access_token: string
  type: string
}

export type SignInResult = {
  refresh_token: string
  access_token: string
  type: string
  user: UserType
}
