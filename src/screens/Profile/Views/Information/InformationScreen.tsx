import { getMe } from '@/libs/api/user'
import { AvatarSetting, Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { InformationType } from './types'

const InformationScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const { colors } = useAppTheme()
  const theme = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data, isLoading } = useQuery(['user', user?.id], () => getMe(user?.id as string), {
    enabled: !!user?.id,
  })

  const {
    control,
    formState: { errors },
  } = useForm<InformationType>({
    values: {
      first_name: data?.first_name as string,
      last_name: data?.last_name as string,
      phone_number: data?.phone_number as string,
      address: data?.address,
    },
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number,
      address: data?.address,
    },
  })

  return (
    <View style={styles.root}>
      <Header title="Cập nhật thông tin" />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', width: '100%', flex: 1, alignItems: 'center' }}>
            <AvatarSetting source={{ uri: undefined }} />
          </View>

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={styles.containerInput}>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      outlineColor={theme.colors.borderInput}
                      styleInput={textStyles.text14}
                      theme={theme}
                      value={value}
                      onChangeText={onChange}
                      label="First name"
                      error={!!errors?.first_name?.message}
                      helperText={errors?.first_name?.message}
                      placeholder="Enter your first name"
                    />
                  )}
                  name="first_name"
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
                      label="Last name"
                      error={!!errors?.last_name?.message}
                      helperText={errors?.last_name?.message}
                      placeholder="Enter your last name"
                    />
                  )}
                  name="last_name"
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
                      error={!!errors?.address?.message}
                      helperText={errors?.address?.message}
                      label="Address"
                      placeholder="Enter your address"
                    />
                  )}
                  name="address"
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
                      error={!!errors?.address?.message}
                      helperText={errors?.address?.message}
                      label="Sô điện thoại"
                      placeholder="Số điện thoại của bạn"
                    />
                  )}
                  name="phone_number"
                />
              </View>

              <Button style={[btnStyles.button, { marginTop: 20 }]} mode="contained">
                Update
              </Button>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { InformationScreen }

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
    marginTop: 32,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  paddingTouch: {
    padding: 10,
  },
  marginInput: {
    marginTop: 20,
  },
})
