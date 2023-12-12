import { InformationType } from '@/screens/Setting'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ImagePickerAsset } from 'expo-image-picker'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { ApiClient } from '../config/react-query'

export const getMe = async (id: string): Promise<InformationType> => {
  const url = `profile/${id}`

  try {
    const response = await ApiClient.get(url)

    return response.data
  } catch (error) {
    const { dispatch } = useDispatch()

    Alert.alert('ERROR', 'SERVER ERROR', [
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('access_token')
          await AsyncStorage.removeItem('persist:root:auth')
          dispatch.auth.setUser(null)
        },
      },
    ])

    throw error
  }
}

type Upload = {
  image: ImagePickerAsset
  id: string
}

export const uploadAvatar = async ({ image, id }: Upload) => {
  const url = `upload/avatar/${id}`

  let formData = new FormData()
  let file = {
    uri: image.uri,
    type: image.type,
    name: image.fileName,
  }

  formData.append('image', file)

  try {
    const response = await ApiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateProfile = async ({ id, data }: { id: string; data: InformationType }) => {
  const url = `profile/${id}`

  try {
    const response = await ApiClient.put(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}
