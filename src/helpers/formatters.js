export const limitString = (string, limit) => {
  if (!limit || !string || string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit).trim()}...`
}
