import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export const convertDateToHour = (date: string | Date | number) => {
  const time = new Date(date)

  return format(time, 'HH:mm')
}

export const convertDateToWeekAndDay = (date: string | Date | number) => {
  const time = new Date(date)

  return format(time, 'EEEE, d/M', { locale: vi })
}

export const convertDate = (date: string | Date | number) => {
  const time = new Date(date)

  return format(time, 'dd/MM/yyyy')
}
