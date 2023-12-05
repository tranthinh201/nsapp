export type AuthStackParams = {
  SIGN_IN: undefined
  SIGN_UP: undefined
  WELCOME: undefined
  FORGOT_PASSWORD: undefined
  HOME: undefined
  VERIFICATION: { email: string }
  RESET_PASSWORD: { token: string }
  VERIFICATION_ACCOUNT: { email: string }
}
