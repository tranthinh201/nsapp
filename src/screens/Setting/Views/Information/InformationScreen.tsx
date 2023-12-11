import { getMe } from '@/libs/api/user'
import { AvatarSetting, Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { RootStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { InformationType } from './types'

const InformationScreen = () => {
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
      <Header title="Thông tin" />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={{ justifyContent: 'center', width: '100%', flex: 1, alignItems: 'center' }}
            >
              <AvatarSetting source={{ uri: undefined }} />
            </View>
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
                      label="Họ"
                      error={!!errors?.first_name?.message}
                      helperText={errors?.first_name?.message}
                      placeholder="Họ của bạn"
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
                      label="Tên"
                      error={!!errors?.last_name?.message}
                      helperText={errors?.last_name?.message}
                      placeholder="Tên của bạn"
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
                      error={!!errors?.address?.message}
                      helperText={errors?.address?.message}
                      label="Địa chỉ"
                      placeholder="Địa chỉ của bạn"
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
                      error={!!errors?.phone_number?.message}
                      helperText={errors?.phone_number?.message}
                      label="Sô điện thoại"
                      placeholder="Số điện thoại của bạn"
                    />
                  )}
                  name="phone_number"
                />
              </View>

              <Button style={[btnStyles.button, { marginTop: 20 }]} mode="contained">
                Cập nhật
              </Button>
            </View>
          </View>
        )}
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