import { getMe, updateProfile } from '@/libs/api/user'
import { AvatarSetting, Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImagePickerAsset } from 'expo-image-picker'
import { isEqual } from 'lodash'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { InformationInputUpdateType, InformationSchema, InformationType } from './types'

const InformationScreen = () => {
  const theme = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const navigation = useNavigation<NavigationProp>()
  const [imagePath, setImagePath] = useState<ImagePickerAsset>()

  const { data, isFetching } = useQuery(['user', user?.id], () => getMe(user?.id as string), {
    enabled: !!user?.id,
  })

  const onAvatarChange = (image: ImagePickerAsset) => {
    setImagePath(image)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationType>({
    values: {
      id: user?.id as string,
      first_name: user?.name as string,
      last_name: user?.last_name as string,
      phone_number: user?.phone_number as string,
      address: user?.phone_number,
      avatar: user?.avatar as string,
    },
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number,
      address: data?.address,
    },
    resolver: zodResolver(InformationSchema),
  })

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      Alert.alert('Thông báo', 'Cập nhật thông tin thành công!')
    },
    onError: () => {
      Alert.alert('Thông báo', 'Cập nhật thất bại!')
    },
  })

  const onSubmit: SubmitHandler<InformationInputUpdateType> = (data) => {
    mutate({ ...data, id: user?.id as string, avatar: imagePath?.uri as string })
  }

  const handleMoveChangePassword = () => {
    navigation.navigate('ProfileStack', {
      screen: 'CHANGE_PASSWORD',
    })
  }

  return (
    <View style={styles.root}>
      <Header
        title="Thông tin"
        right={
          <Button onPress={handleMoveChangePassword} mode="text">
            Đổi mật khẩu
          </Button>
        }
      />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', width: '100%', flex: 1, alignItems: 'center' }}>
            <AvatarSetting source={{ uri: user?.avatar }} onChange={onAvatarChange} />
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

            <Button
              style={[btnStyles.button, { marginTop: 20 }]}
              onPress={handleSubmit(onSubmit)}
              mode="contained"
            >
              Cập nhật
            </Button>
          </View>
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
