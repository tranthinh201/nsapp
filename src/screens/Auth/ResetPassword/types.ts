import { z } from 'zod'

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'Password is field required!' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is field required!' }),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  })

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>
