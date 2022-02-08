import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'

import { useUser } from 'context/user-context'

import { loginResolver } from 'helpers/yup-schemas'

const Login = () => {
  const { login } = useUser()

  const methods = useForm({ resolver: loginResolver })
  const { handleSubmit, formState } = methods

  return (
    <FormProvider {...methods}>
      <Column as='form' onSubmit={handleSubmit(login)} p={40} alignItems='center'>
        <Input name='email' label='E-mail' placeholder='example@example.com' />
        <Input name='password' label='Senha' placeholder='******' type='password' />
        <Button bg='purple' isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Column>
    </FormProvider>
  )
}

export default Login
