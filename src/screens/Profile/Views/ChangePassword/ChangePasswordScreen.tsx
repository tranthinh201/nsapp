import EyeSvg from '@/assets/svg/eye.svg'
import HideSvg from '@/assets/svg/hide.svg'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text, TextInput as TextInputPaper } from 'react-native-paper'
import { ChangePasswordSchema, ChangePasswordType } from './types'

const ChangePasswordScreen = () => {
  const theme = useAppTheme()
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
  const handleHidePassword = () => {
    setIsHidePassword((prevState) => !prevState)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const onSubmit = (data: ChangePasswordType) => {}

  return (
    <View style={styles.root}>
      <Header title="Change password" />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <Text style={textStyles.labelInput14}>Please enter and confirm your new password.</Text>
          </View>

          <View style={styles.containerInput}>
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

            <View>
              <Text style={textStyles.labelInput14}>New password</Text>

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
                    error={!!errors?.new_password?.message}
                    helperText={errors?.new_password?.message}
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
                name="new_password"
              />
            </View>

            <View>
              <Text style={textStyles.labelInput14}>Confirm password</Text>

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
                    error={!!errors?.confirm_password?.message}
                    helperText={errors?.confirm_password?.message}
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
                name="confirm_password"
              />
            </View>
          </View>

          <Button mode="contained" style={btnStyles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={{ fontSize: 14 }}>Login</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { ChangePasswordScreen }

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
