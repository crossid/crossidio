import dayjs from 'dayjs'

export const MACHINE_FORMAT = 'YYYY-MM-DDThh:mm:ssTZD'
export const UI_DATE_FORMAT = 'dddd, MMMM DD, YYYY' // 'MMMM D, YYYY'

export function formatDate(
  date: Date | string,
  format: string = UI_DATE_FORMAT
) {
  return dayjs(date).format(format)
}
