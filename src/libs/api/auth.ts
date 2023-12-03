import { ForgotPasswordType, VerifyOtpType } from '@/screens/Auth/ForgotPassword/types'
import { ResetPasswordType } from '@/screens/Auth/ResetPassword/types'
import { SignInType } from '@/screens/Auth/SignIn/types'
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
    },
    payload: response.data.payload,
  }
}

type ChangePasswordType = {
  password: string
  new_password: string
  id: string
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

export const resetPassword = async ({ password, token }: ResetPasswordType) => {
  const response = await ApiClientUnAuth.post('auth/reset-password', {
    password,
    token,
  })

  return response
}
