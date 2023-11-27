import { z } from 'zod'

export const ChangePasswordSchema = z.object({
  password: z.string().trim().min(1, { message: 'Password is field required!' }),
  new_password: z.string().trim().min(1, { message: 'Password is field required!' }),
  confirm_password: z.string().trim().min(1, { message: 'Password is field required!' }),
})

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>
