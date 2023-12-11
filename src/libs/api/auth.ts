import { ForgotPasswordType, VerifyOtpType } from '@/screens/Auth/ForgotPassword'
import { ResetPasswordType } from '@/screens/Auth/ResetPassword'
import { SignInResult, SignInType } from '@/screens/Auth/SignIn'
import { SignUpType } from '@/screens/Auth/SignUp'
import { ChangePasswordType } from '@/screens/Setting'
import { ApiClient, ApiClientUnAuth } from '../config/react-query'

export const signIn = async ({ email, password }: SignInType): Promise<SignInResult> => {
  const response = await ApiClient.post('auth/sign-in', {
    email: email,
    password: password,
  })

  return response.data
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
