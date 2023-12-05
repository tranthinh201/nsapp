import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    id: z.string(),
    password: z.string().trim().min(1, { message: 'Password is field required!' }),
    new_password: z.string().trim().min(1, { message: 'Password is field required!' }),
    confirm_password: z.string().trim().min(1, { message: 'Password is field required!' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'New password and confirm password must be the same!',
    path: ['confirm_password'],
  })

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>
