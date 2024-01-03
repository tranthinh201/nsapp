import { ApiClient } from '../config/react-query'

export const createIntent = async ({
  amount,
}: {
  amount: number
}): Promise<{ paymentIntent: string }> => {
  try {
    const response = await ApiClient.post('/payment/create-intent', {
      amount,
    })

    return response.data
  } catch (error) {
    throw error
  }
}
