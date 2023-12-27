import { z } from 'zod'

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, { message: 'Tên phải có ít nhất 1 ký tự' }),
    last_name: z.string().min(1, { message: 'Họ phải có ít nhất 1 ký tự' }),
    email: z
      .string()
      .min(1, { message: 'Email phải có ít nhất 1 ký tự' })
      .email({ message: 'Email không hợp lệ' }),
    password: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    confirm_password: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu và xác nhận mật khẩu phải giống nhau',
    path: ['confirm_password'],
  })

export type SignUpType = z.infer<typeof SignUpSchema>
