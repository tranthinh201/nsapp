import { CreateTransactionType } from '@/screens/Booking'
import { ApiClient } from '../config/react-query'

export const createTransaction = async ({
  payment_type,
  price,
  schedule_id,
  seats,
  status,
  user_id,
  food_id,
}: CreateTransactionType) => {
  const response = await ApiClient.post('ticket/', {
    payment_type,
    price,
    schedule_id,
    seats,
    status,
    user_id,
    food_id,
  })

  return response.data
}
