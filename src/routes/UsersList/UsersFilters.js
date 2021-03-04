import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import Row from 'components/Row'
import Input from 'components/Input'
import Button from 'components/Button'
import Column from 'components/Column'
import Loader from 'components/Loader'
import Select from 'components/Select'

import { useUser } from 'context/user-context'
import { dateMask } from 'helpers'

const UsersFilters = ({ filters, setFilters }) => {
  const { usersRoles } = useUser()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm()

  useEffect(() => {
    if (!Object.values(filters).some(value => !!value)) return
    reset(filters)
  }, [])

  const onSubmit = values => {
    if (!Object.values(values).some(value => !!value)) return
    const data = {}

    Object.entries(values).forEach(([key, value]) => {
      if (!value) return

      data[key] = value
    })
    setFilters(data)
  }

  const handleClearForm = () => {
    reset()
    setFilters({})
  }

  return (
    <Column width='100%' as='form' onSubmit={handleSubmit(onSubmit)} my={12}>
      <Row>
        <Column width={1 / 4} px={8}>
          <Input label='Nome' placeholder='Nome' width='100%' name='name' ref={register} />
        </Column>
        <Column width={1 / 4} px={8}>
          <Input label='Email' placeholder='Email' width='100%' name='email' ref={register} />
        </Column>
        <Column width={1 / 4} px={8}>
          <Controller
            name='role_id'
            control={control}
            defaultValue=''
            render={props => (
              <Select
                label='Função'
                placeholder='Selecione uma função'
                width='100%'
                options={usersRoles}
                mb={10}
                {...props}
              />
            )}
          />
        </Column>
        <Column width={1 / 4} px={8}>
          <Input
            label='Criado em'
            placeholder='dd/mm/yyyy'
            width='100%'
            name='created_at'
            ref={register}
            mask={dateMask}
          />
        </Column>
      </Row>
      <Row alignItems='center' justifyContent='flex-end'>
        <Button
          type='button'
          border='1px solid purple'
          backgroundColor='transparent'
          mr={8}
          color='primary.main'
          fontWeight='bold'
          disabled={isSubmitting}
          onClick={handleClearForm}
        >
          Limpar
        </Button>
        <Button ml={8} backgroundColor='primary.main' fontWeight='bold' disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : 'Filtrar'}
        </Button>
      </Row>
    </Column>
  )
}

export default UsersFilters
