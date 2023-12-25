import AppleIcon from '@/assets/svg/apple.svg'
import EyeSvg from '@/assets/svg/eye.svg'
import FaceBookIcon from '@/assets/svg/facebook.svg'
import GoogleIcon from '@/assets/svg/google.svg'
import HideSvg from '@/assets/svg/hide.svg'
import { signIn } from '@/libs/api/auth'
import { setAccessToken, setAuthUser } from '@/libs/asyncStorage'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput as TextInputPaper } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { SignInSchema, SignInType } from './types'

const SignInScreen = () => {
  const dispatch = useDispatch()
  const theme = useAppTheme()
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()
  const width = Dimensions.get('screen').width
  const handleHidePassword = () => {
    setIsHidePassword((prevState) => !prevState)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    mode: 'onChange',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isLoading, mutate } = useMutation(signIn, {
    onSuccess: (response, { email }) => {
      const { id, email_verified, first_name, avatar, phone_number, last_name } = response.user

      if (response) {
        if (email_verified) {
          setAccessToken(response.access_token)

          setAuthUser({
            id,
            email,
            name: first_name,
            avatar,
            phone_number,
            last_name,
          })

          dispatch.auth.setUser({
            id,
            email,
            name: first_name,
            avatar,
            phone_number,
            last_name,
          })

          navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
        } else {
          navigation.navigate('AuthStack', {
            screen: 'VERIFICATION_ACCOUNT',
            params: {
              email: email,
            },
          })
        }
      }
    },
    onSettled(data) {
      if (!data) {
        Alert.alert('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng')
      }
    },
  })

  const onSubmit = (data: SignInType) => {
    mutate(data)
  }

  return (
    <View style={styles.root}>
      <Header />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={textStyles.title}>Chào mừng bạn đã quay trở lại</Text>
          </View>

          <View style={styles.containerInput}>
            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    label="Email"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                    placeholder="Nhập email của bạn"
                  />
                )}
                name="email"
              />
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    label="Mật khẩu"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isHidePassword}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                    placeholder="Nhập mật khẩu của bạn"
                    right={
                      <TextInputPaper.Icon
                        forceTextInputFocus={false}
                        onPress={handleHidePassword}
                        icon={() => (
                          <View style={styles.paddingTouch}>
                            {isHidePassword ? <HideSvg /> : <EyeSvg />}
                          </View>
                        )}
                      />
                    }
                  />
                )}
                name="password"
              />
            </View>
          </View>

          <View style={styles.textForgotPassword}>
            <Pressable
              onPress={() => navigation.navigate('AuthStack', { screen: 'FORGOT_PASSWORD' })}
            >
              <Text style={{ ...textStyles.text14, color: colors.textForgot }}>Quên mật khẩu?</Text>
            </Pressable>
          </View>

          <View style={styles.socialList}>
            <View style={[styles.socialItem, { width: width / 3 - 25 }]}>
              <FaceBookIcon />
            </View>

            <View style={[styles.socialItem, { width: width / 3 - 25 }]}>
              <GoogleIcon />
            </View>

            <View style={[styles.socialItem, { width: width / 3 - 25 }]}>
              <AppleIcon />
            </View>
          </View>

          <Button
            loading={isLoading}
            mode="contained"
            style={btnStyles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontSize: 14 }}>Đăng nhập</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { SignInScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    paddingHorizontal: 29,
  },
  containerInput: {
    marginTop: 32,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  paddingTouch: {
    padding: 10,
  },
  title: {
    marginTop: 20,
    color: 'red',
  },
  textForgotPassword: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  socialList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialItem: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
})
