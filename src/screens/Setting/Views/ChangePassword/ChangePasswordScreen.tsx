import { changePassword } from '@/libs/api/auth'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { RootStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { ChangePasswordSchema, ChangePasswordType } from './types'

const ChangePasswordScreen = () => {
  const theme = useAppTheme()

  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      id: user?.id,
      password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const { isLoading, mutate } = useMutation(changePassword, {
    onSuccess: (data) => {
      Alert.alert('Success', data.message)
    },
  })

  const onSubmit = (data: ChangePasswordType) => {
    mutate(data)
  }

  return (
    <View style={styles.root}>
      <Header title="Thay đổi mật khẩu" />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerInput}>
            <View style={styles.marginInput}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    label="Mậ khẩu cũ"
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                )}
                name="password"
              />
            </View>

            <View style={styles.marginInput}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    label="Mật khẩu mới"
                    error={!!errors?.new_password?.message}
                    helperText={errors?.new_password?.message}
                  />
                )}
                name="new_password"
              />
            </View>

            <View style={styles.marginInput}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    error={!!errors?.confirm_password?.message}
                    helperText={errors?.confirm_password?.message}
                    label="Xác nhận mật khẩu"
                  />
                )}
                name="confirm_password"
              />
            </View>
          </View>

          <Button
            mode="contained"
            loading={isLoading}
            style={[btnStyles.button]}
            onPress={handleSubmit(onSubmit)}
          >
            Cập nhật
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
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 29,
  },
  containerInput: {
    marginVertical: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  marginInput: {
    marginBottom: 29,
  },
})
