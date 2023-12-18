import { FoodType } from '@/screens/Food/type'
import { ApiClientUnAuth } from '../config/react-query'

export const getListFood = async (): Promise<FoodType[]> => {
  const response = await ApiClientUnAuth.get('product')

  return response.data
}
