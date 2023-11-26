import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { ApiClient } from '../config/react-query'

export const getUserDetail = async (member_id: string) => {
  const url = `/auth/${member_id}`

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
  }
}
