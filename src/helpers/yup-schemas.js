import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required(),
  password: yup.string().required()
})
