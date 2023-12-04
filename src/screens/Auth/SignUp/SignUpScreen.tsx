import { signUp } from '@/libs/api/auth'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { SignUpSchema, SignUpType } from './types'

const SignUpScreen = () => {
  const theme = useAppTheme()
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    mode: 'onChange',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isLoading, mutate } = useMutation(signUp, {
    onSuccess: (response, { email }) => {
      if (response.status === 201) {
        navigation.navigate('AuthStack', { screen: 'VERIFICATION_ACCOUNT', params: { email } })
      } else {
        Alert.alert('Error')
      }
    },
  })

  const onSubmit = (data: SignUpType) => {
    mutate(data)
  }

  return (
    <View style={styles.root}>
      <Header />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={textStyles.title}>Welcome back! NsTeam to see you, Again!</Text>
          </View>

          <View style={styles.containerInput}>
            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Email"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                    placeholder="Enter your email"
                  />
                )}
                name="email"
              />
            </View>

            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Password"
                    theme={theme}
                    value={value}
                    secureTextEntry={true}
                    onChangeText={onChange}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                    placeholder="Enter your password"
                  />
                )}
                name="password"
              />
            </View>

            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Confirm Password"
                    theme={theme}
                    value={value}
                    secureTextEntry={true}
                    onChangeText={onChange}
                    error={!!errors?.confirm_password?.message}
                    helperText={errors?.confirm_password?.message}
                    placeholder="Enter your confirm password"
                  />
                )}
                name="confirm_password"
              />
            </View>

            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="First name"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.first_name?.message}
                    helperText={errors?.first_name?.message}
                    placeholder="Enter your first name"
                  />
                )}
                name="first_name"
              />
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Last name"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.last_name?.message}
                    helperText={errors?.last_name?.message}
                    placeholder="Enter your password"
                  />
                )}
                name="last_name"
              />
            </View>
          </View>

          <Button
            loading={isLoading}
            mode="contained"
            style={btnStyles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontSize: 14 }}>Sign up</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { SignUpScreen }

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
  },
})
