import { BillingType } from '@/screens/Setting/types'
import { ApiClient } from '../config/react-query'

export const getUnCheckTicket = async (): Promise<BillingType[]> => {
  try {
    const response = await ApiClient.get(`ticket/un-check`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getDetailTicket = async ({ id }: { id: string }): Promise<BillingType> => {
  try {
    const response = await ApiClient.get(`ticket/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
