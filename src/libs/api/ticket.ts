import { BillingType } from '@/screens/Setting/types'
import { ApiClient } from '../config/react-query'

export const getUnCheckTicket = async ({ id }: { id: string }): Promise<BillingType[]> => {
  try {
    const response = await ApiClient.get(`ticket/un-check/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getDetailTicket = async ({
  id,
  user_id,
}: {
  id: string
  user_id: string
}): Promise<BillingType> => {
  try {
    const response = await ApiClient.get(`ticket/${id}/${user_id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
