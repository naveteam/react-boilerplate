export const removeEmptyKeysFromObject = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return acc
    }

    return {
      ...acc,
      [key]: value
    }
  }, {})
