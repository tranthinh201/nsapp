import { resetPassword } from '@/libs/api/auth'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteAuthStackType } from '@/libs/route'
import { btnStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { ResetPasswordType } from './types'

const ResetPasswordScreen = () => {
  const route = useRoute<RouteAuthStackType<'RESET_PASSWORD'>>()
  const navigation = useNavigation<NavigationProp>()
  const theme = useAppTheme()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: route.params?.token,
    },
  })

  const { isLoading, mutate } = useMutation(resetPassword, {
    onSuccess: (response) => {
      if (response.status === 201) {
        Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công!')
        navigation.navigate('AuthStack', { screen: 'SIGN_IN' })
      } else {
        Alert.alert('Thông báo', 'Cập nhật mật khẩu thất bại!')
      }
    },
  })

  const onSubmit = (data: ResetPasswordType) => {
    mutate(data)
  }

  return (
    <View style={styles.root}>
      <Header title="Đặt lại mật khẩu" />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerInput}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  outlineColor={theme.colors.borderInput}
                  styleInput={{
                    fontFamily: theme.fonts.default.fontFamily,
                    fontSize: 14,
                  }}
                  label="Mật khẩu"
                  theme={theme}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                  placeholder="Nhập mât khẩu mới"
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  outlineColor={theme.colors.borderInput}
                  styleInput={{
                    fontFamily: theme.fonts.default.fontFamily,
                    fontSize: 14,
                  }}
                  label="Nhập lại mật khẩu"
                  theme={theme}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                  placeholder="Nhập lại mât khẩu mới"
                />
              )}
              name="confirmPassword"
            />
          </View>

          <Button
            mode="contained"
            style={btnStyles.button}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontSize: 14, color: theme.colors.text }}>Cập nhật</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { ResetPasswordScreen }

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
    marginBottom: 20,
    gap: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
})
