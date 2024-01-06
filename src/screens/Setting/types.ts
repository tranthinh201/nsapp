import { z } from 'zod'

const ticketSchema = z.object({
  ticket_id: z.string(),
  seat_name: z.string(),
})

const scheduleSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
  screen_name: z.string(),
  cinema_name: z.string(),
  cinema_address: z.string(),
  movie_name: z.string(),
  movie_image: z.string(),
  cinema_image: z.string(),
  movie_type: z.string(),
  movie_format: z.string(),
  movie_language: z.string(),
})

const billingSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  food_id: z.string().nullable(),
  schedule_id: z.string(),
  price: z.number(),
  is_checkin: z.boolean(),
  status: z.string(),
  payment_type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  tickets: z.array(ticketSchema),
  schedule: scheduleSchema,
})

export type BillingType = z.infer<typeof billingSchema>
