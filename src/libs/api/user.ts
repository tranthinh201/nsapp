import { InformationInputUpdateType, InformationType } from '@/screens/Setting'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

export const updateProfile = async ({
  id,
  first_name,
  last_name,
  phone_number,
  address,
  avatar,
}: InformationInputUpdateType) => {
  const url = `profile/${id}`

  try {
    const formData = new FormData()
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('phone_number', phone_number)
    formData.append('address', address)
    formData.append('avatar', avatar)
    const response = await ApiClient.put(url, formData)

    return response.data
  } catch (error) {
    throw error
  }
}
