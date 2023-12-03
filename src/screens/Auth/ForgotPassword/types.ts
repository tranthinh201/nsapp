import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
})

export const VerifyOtpSchema = z.object({
  // email: z.string().email({ message: 'Email is not valid' }),
  token: z.string(),
})

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>
export type VerifyOtpType = z.infer<typeof VerifyOtpSchema>
