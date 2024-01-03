import { CommentInput } from '@/screens/Booking/CommentScreen/type'
import { ApiClient } from '../config/react-query'

export const createComment = async ({
  content,
  movie_id,
  star,
  user_id,
  feeling,
  image,
}: CommentInput) => {
  try {
    const response = await ApiClient.post('comment', {
      content,
      movie_id,
      star,
      user_id,
      feeling,
      image,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
