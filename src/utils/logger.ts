import Logger from 'pino'
import dayjs from 'dayjs'

export const logger = Logger({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
})