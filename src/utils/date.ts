// @ts-ignore
import tinytime from 'tinytime'

export function formatDate(date: Date | 'string', format: string) {
  return tinytime(format, { padMonth: true })
    .render(typeof date === 'string' ? new Date(date) : date)
    .replace('Febuary', 'February')
}
