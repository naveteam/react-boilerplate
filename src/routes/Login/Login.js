import React from 'react'
import { useForm } from 'react-hook-form'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'

import { useUser } from 'context/user-context'
import { useModal } from 'context/modal-context'

import { loginResolver } from 'helpers/yup-schemas'

const Login = () => {
  const { login } = useUser()
  const { handleOpenModal } = useModal()

  const { register, handleSubmit, errors, formState } = useForm({ resolver: loginResolver })

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
        ref={register}
        label='E-mail'
        placeholder='example@example.com'
        error={errors.email?.message}
      />
      <Input
        name='password'
        ref={register}
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
