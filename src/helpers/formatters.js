const { format } = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

export const limitString = (string, limit) => {
  if (!limit || !string || string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit).trim()}...`
}

export const formatIsoString = isoString => format(new Date(isoString))

export const formatDate = date => {
  const day = date.split('/')[0]
  const month = date.split('/')[1]
  const year = date.split('/')[2]

  return `${year}-${month}-${day}`
}
