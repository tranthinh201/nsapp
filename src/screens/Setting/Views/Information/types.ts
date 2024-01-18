import { z } from 'zod'

export const InformationSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, { message: 'Yêu cầu nhập tên' }),
  last_name: z.string().min(1, { message: 'Yêu cầu nhập họ' }),
  phone_number: z.string().min(1, { message: 'Yêu cầu nhập số điện thoại' }),
  address: z.string().optional(),
  avatar: z.instanceof(File).or(z.string()).optional(),
})

export const InformationInputUpdateSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, { message: 'Yêu cầu nhập tên' }),
  last_name: z.string().min(1, { message: 'Yêu cầu nhập họ' }),
  phone_number: z.string().min(1, { message: 'Yêu cầu nhập số điện thoại' }),
  birthday: z.date().optional(),
  address: z.string().optional(),
  avatar: z.instanceof(File).or(z.string()).optional(),
})

export type InformationType = z.infer<typeof InformationSchema>
export type InformationInputUpdateType = z.infer<typeof InformationInputUpdateSchema>
