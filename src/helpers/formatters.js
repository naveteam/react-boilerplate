import { format as dateFnsFormat } from 'date-fns'

const { format } = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

export const limitString = (string, limit) => {
  if (!limit || !string || string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit).trim()}...`
}

export const formatIsoString = isoString => format(new Date(isoString))

export const formatDateToApi = date => dateFnsFormat(date, 'yyyy-MM-dd')
