export const dateMask = {
  format: string => {
    const numbers = string.replace(/\D/g, '').substr(0, 8).split('')

    return numbers.reduce((acc, digit, index) => `${acc}${[2, 4].includes(index) ? '/' : ''}${digit}`, '')
  },
  accept: /\d+/g
}

export const phoneMask = {
  format: string => {
    const numbers = string.replace(/\D/g, '').substr(0, 11)
    const match = numbers.match(/^(\d{1,2})(\d{0,5})(\d{0,4})$/)

    if (!match) return numbers

    return `(${match[1]})${match[2] ? ' ' : ''}${match[2]}${match[3] ? ' ' : ''}${match[3]}`
  },
  accept: /\d+/g
}

export const cpfMask = {
  format: string => {
    const numbers = string.replace(/\D/g, '').substr(0, 11)
    const match = numbers.match(/^(\d{1,3})(\d{0,3})(\d{0,3})(\d{0,2})$/)

    if (!match) return numbers

    return `${match[1]}${match[2] ? '.' : ''}${match[2]}${match[3] ? '.' : ''}${match[3]}${match[4] ? '-' : ''}${
      match[4]
    }`
  },
  accept: /\d+/g
}

export const cepMask = {
  format: string => {
    const numbers = string.replace(/\D/g, '').substr(0, 8)
    const match = numbers.match(/^(\d{1,5})(\d{0,3})$/)

    if (!match) return numbers

    return `${match[1]}${match[2] ? '-' : ''}${match[2]}`
  },
  accept: /\d+/g
}

export const moneyMask = {
  format: string => {
    const numbers = Number(string.replace(/\D/g, '')) / 100

    if (!numbers) return ''

    return numbers.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  },
  accept: /\d+/g
}
