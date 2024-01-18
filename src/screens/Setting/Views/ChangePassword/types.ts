import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    id: z.string(),
    password: z.string().trim().min(1, { message: 'Yêu cầu nhập mật khẩu hiện tại!' }),
    new_password: z.string().trim().min(1, { message: 'Yêu cầu nhập mật khẩu mới!' }),
    confirm_password: z.string().trim().min(1, { message: 'Yêu cầu nhập lại mật khẩu mới!' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu mới và xác nhận mật khẩu phải giống nhau!',
    path: ['confirm_password'],
  })

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>
