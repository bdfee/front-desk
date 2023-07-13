import dayjs from 'dayjs'
import { dayjsLocalizer } from 'react-big-calendar'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

export const localizer = dayjsLocalizer(dayjs)
export { dayjs }
