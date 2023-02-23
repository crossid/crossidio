import { formatDate, MACHINE_FORMAT } from '@/utils/date'

const Time = ({ date, format }: { date: string | Date; format?: string }) => {
  const machine = formatDate(date, MACHINE_FORMAT)
  return <time dateTime={machine}>{formatDate(date, format)}</time>
}

export default Time
