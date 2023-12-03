import { forgotPassword } from '@/libs/api/auth'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { ForgotPasswordSchema, ForgotPasswordType } from './types'

const ForgotPasswordScreen = () => {
  const theme = useAppTheme()
  const { navigate } = useNavigation<NavigationProp>()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    mode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { isLoading, mutate } = useMutation(forgotPassword)

  const onSubmit = (data: ForgotPasswordType) => {
    mutate(data, {
      onSuccess: (response) => {
        const email = getValues().email

        console.log(response)
        if (response.code === 200) {
          Alert.alert('Success', 'Please check your email to get password')
          navigate('AuthStack', {
            screen: 'VERIFICATION',
            params: { email },
          })
        } else if (response.code === 404) {
          Alert.alert('Email not found')
        }
      },
    })
  }

  return (
    <View style={styles.root}>
      <Header />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={textStyles.title}>Password will be sent to your register email</Text>
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

            <Button
              loading={isLoading}
              mode="contained"
              style={btnStyles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ fontSize: 14, color: theme.colors.text }}>Next</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { ForgotPasswordScreen }

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
  title: {
    marginTop: 20,
  },
})
