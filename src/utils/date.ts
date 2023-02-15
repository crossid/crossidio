import dayjs from 'dayjs'

export const timeTagDateFormat = 'YYYY-MM-DDTHH:mm:ssZ'

export function formatDate(date: Date | 'string', format: string) {
  return dayjs(date).format(format)
}
