import React from 'react'
import { useForm } from 'react-hook-form'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'

import { useAuth } from 'context/auth-context'

import { loginSchema } from 'helpers/yup-schemas'

const Login = () => {
  const { login } = useAuth()

  const { register, handleSubmit, errors, formState } = useForm({ validationSchema: loginSchema })

  const onSubmit = async values => {
    try {
      await login(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Column as='form' onSubmit={handleSubmit(onSubmit)} p={40} alignItems='center'>
      <Input
        name='email'
        register={register}
        label='E-mail'
        placeholder='example@example.com'
        error={errors.email?.message}
      />
      <Input
        name='password'
        register={register}
        label='Senha'
        placeholder='******'
        error={errors.password?.message}
        type='password'
      />
      <Button bg='purple' isLoading={formState.isSubmitting}>
        Entrar
      </Button>
    </Column>
  )
}

export default Login
