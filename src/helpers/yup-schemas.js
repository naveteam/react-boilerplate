import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
})

const emptyStringToNull = (value, originalValue) => {
  if (originalValue === '') {
    return null
  }
  return value
}

const yupShapeWithResolver = shape => yupResolver(yup.object().shape(shape))

export const loginResolver = yupShapeWithResolver({
  email: yup.string().email('Insira um e-mail válido').required(),
  password: yup.string().required()
})

export const userFormResolver = yupShapeWithResolver({
  email: yup.string().email('Insira um e-mail válido').required(),
  name: yup.string().min(2, 'Mínimo de 2 caracteres no campo').required(),
  role_id: yup.number().transform(emptyStringToNull).nullable().required(),
  birthdate: yup
    .string()
    .matches(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Insira uma data válida')
    .required(),
  password: yup.string().min(2, 'Mínimo de 2 caracteres no campo').required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não são iguais')
    .required()
})
