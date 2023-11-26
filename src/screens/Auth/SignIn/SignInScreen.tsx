// import EyeSvg from '@/assets/svg/eye.svg'
// import HideSvg from '@/assets/svg/hide.svg'
import { signIn } from '@/libs/api/auth'
import { setAccessToken, setAuthUser } from '@/libs/asyncStorage'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput as TextInputPaper } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { SignInSchema, SignInType } from './types'

const SignInScreen = () => {
  const dispatch = useDispatch()
  const theme = useAppTheme()
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
  const handleHidePassword = () => {
    setIsHidePassword((prevState) => !prevState)
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      if (response) {
        setAccessToken(response.payload.token)

        setAuthUser({
          id: response.user.id,
          email: email,
          name: response.user.first_name,
        })

        dispatch.auth.setUser({
          email: email,
          id: response.user.id,
        })
      }
    },
    onSettled(data) {
      if (!data) {
        Alert.alert('Error', 'Email or password is incorrect')
      }
    },
  })

  const onSubmit = (data: SignInType) => {
    mutate(data)
  }

  return (
    <View style={styles.root}>
      <Header title="Mini app" hideHeaderLeft />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* <Text style={[textStyles.title, { textAlign: 'center', marginTop: 22 }]}>ロギング</Text> */}

          <View style={styles.containerInput}>
            <View style={{ marginBottom: 29 }}>
              <Text style={textStyles.labelInput14}>Email</Text>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                )}
                name="email"
              />
            </View>

            <View>
              <Text style={textStyles.labelInput14}>Password</Text>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isHidePassword}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                    right={
                      <TextInputPaper.Icon
                        forceTextInputFocus={false}
                        onPress={handleHidePassword}
                        icon={() => (
                          <View style={styles.paddingTouch}>
                            {/* {isHidePassword ? <HideSvg /> : <EyeSvg />} */}
                            {isHidePassword ? (
                              <Image source={require('@/assets/svg/hide.svg')} />
                            ) : (
                              <Image source={require('@/assets/svg/eye.svg')} />
                            )}
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

          <Button
            loading={isLoading}
            mode="contained"
            style={btnStyles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontSize: 14 }}>Login</Text>
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
    marginTop: 53,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  paddingTouch: {
    padding: 10,
  },
})
