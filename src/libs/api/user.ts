import { InformationType } from '@/screens/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { ApiClient } from '../config/react-query'

export const getMe = async (id: string): Promise<InformationType> => {
  const url = `profile/${id}`

  try {
    const response = await ApiClient.get(url)

    return response.data
  } catch (error) {
    Alert.alert('ERROR', 'SERVER ERROR', [
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('access_token')
        },
      },
    ])

    throw error
  }
}

export type NotificationType = {
  member_id: string | number | undefined
  notification: string | boolean | undefined | number
}

export const saveNotificationStatus = async (paramsNotification: NotificationType) => {
  const url = '/members/notification'
  try {
    const response = await ApiClient.post(url, paramsNotification)
    return response
  } catch (error) {
    throw error
  }
}

export const saveMemberDevice = async (payload: {
  member_id: string
  os: string
  device_token: string
  device_token_for_find: string
}) => {
  return await ApiClient.post('/members/member_devices', payload)
}

export const getNotificationStatus = async (member_id: number) => {
  const response = await ApiClient.get(`/members/notification/${member_id}`)
  return response.data.notification
}
