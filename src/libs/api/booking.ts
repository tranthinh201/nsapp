import { CreateTransactionType } from '@/screens/Booking'
import { ApiClient } from '../config/react-query'

export const createTransaction = async ({
  price,
  schedule_id,
  seats,
  payment_status,
  user_id,
  foods,
  payment_intent_id,
}: CreateTransactionType) => {
  const response = await ApiClient.post('ticket', {
    price,
    schedule_id,
    seats,
    payment_status,
    user_id,
    foods,
    payment_intent_id,
  })

  return response.data
}

export const cancelTransaction = async ({ id }: { id: string }) => {
  try {
    const response = await ApiClient.delete(`ticket/cancellation/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
