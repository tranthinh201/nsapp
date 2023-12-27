import { ApiClientUnAuth } from '../config/react-query'
import { Ticket } from '../types/movie'

export const getUnCheckTicket = async ({ id }: { id: string }): Promise<Ticket[]> => {
  try {
    const response = await ApiClientUnAuth.get(`ticket/un-check/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
