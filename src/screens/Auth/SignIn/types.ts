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
