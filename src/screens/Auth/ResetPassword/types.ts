import { z } from 'zod'

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'Mật khẩu không được để trống!' }),
    confirmPassword: z.string().min(1, { message: 'Mật khẩu xác nhận không được để trống' }),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  })

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>
