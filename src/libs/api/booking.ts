import { CreateTransactionType } from '@/screens/Booking'
import { ApiClient } from '../config/react-query'

export const createTransaction = async ({
  price,
  schedule_id,
  seats,
  payment_status,
  user_id,
  foods,
}: CreateTransactionType) => {
  const response = await ApiClient.post('ticket/', {
    price,
    schedule_id,
    seats,
    payment_status,
    user_id,
    foods,
  })

  return response.data
}
