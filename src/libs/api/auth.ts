import { ForgotPasswordType, VerifyOtpType } from '@/screens/Auth/ForgotPassword/types'
import { ResetPasswordType } from '@/screens/Auth/ResetPassword/types'
import { SignInType } from '@/screens/Auth/SignIn/types'
import { SignUpType } from '@/screens/Auth/SignUp/types'
import { ChangePasswordType } from '@/screens/Profile'
import { ApiClient, ApiClientUnAuth } from '../config/react-query'

type PayloadType = {
  refresh_token: string
  token: string
  type: string
}

type UserType = {
  id: string
  first_name: string
  email: string
  email_verified?: Date
  avatar: string
}

type SignInResult = {
  user: UserType
  payload: PayloadType
}

export const signIn = async ({ email, password }: SignInType): Promise<SignInResult> => {
  const response = await ApiClient.post<{ user: UserType; payload: PayloadType }>('auth/sign-in', {
    email: email,
    password: password,
  })

  return {
    user: {
      id: response.data.user.id,
      first_name: response.data.user.first_name,
      email: email,
      email_verified: response.data.user.email_verified,
      avatar: response.data.user.avatar,
    },
    payload: response.data.payload,
  }
}

export const changePassword = async ({ password, new_password, id }: ChangePasswordType) => {
  const response = await ApiClient.post('auth/change-password', {
    password,
    new_password,
    id,
  })

  return response.data
}

export const forgotPassword = async ({ email }: ForgotPasswordType) => {
  const response = await ApiClientUnAuth.post('auth/forgot-password', {
    email,
  })

  return response.data
}

export const verifyForgotPassword = async ({ token }: VerifyOtpType) => {
  const response = await ApiClientUnAuth.post('auth/verify-otp', {
    token,
  })

  return response
}

export const resendOtp = async ({ email }: ForgotPasswordType) => {
  const response = await ApiClientUnAuth.post('auth/resend-otp', {
    email,
  })

  return response
}

export const resetPassword = async ({ password, token }: ResetPasswordType) => {
  const response = await ApiClientUnAuth.post('auth/reset-password', {
    password,
    token,
  })

  return response
}

export const verifyAccount = async ({ token }: VerifyOtpType) => {
  const response = await ApiClientUnAuth.post('auth/verify-account', {
    token,
  })

  return response
}

export const resendVerifyAccount = async ({ email }: ForgotPasswordType) => {
  const response = await ApiClientUnAuth.post('auth/resent-verify-account', {
    email,
  })

  return response
}

export const signUp = async ({ first_name, last_name, email, password }: SignUpType) => {
  const response = await ApiClientUnAuth.post('auth/sign-up', {
    first_name,
    last_name,
    email,
    password,
  })

  return response
}
