import React from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'

import Row from 'components/Row'
import Input from 'components/Input'
import Button from 'components/Button'
import Column from 'components/Column'
import Loader from 'components/Loader'
import Select from 'components/Select'
import Datepicker from 'components/Datepicker'

import { useUser } from 'context/user-context'

const UsersFilters = ({ filters = {}, setFilters }) => {
  const { userRoles } = useUser([])

  const methods = useForm({
    defaultValues: filters
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = methods

  const handleClearForm = () => {
    reset({ role: null, created_at: null })
    setFilters({})
  }

  return (
    <FormProvider {...methods}>
      <Column width='100%' as='form' onSubmit={handleSubmit(setFilters)} my={12}>
        <Row>
          <Input width={1 / 4} px={8} label='Nome' placeholder='Nome' name='name' />
          <Input width={1 / 4} px={8} label='Email' placeholder='Email' name='email' />
          <Controller
            name='role'
            control={control}
            defaultValue=''
            render={props => (
              <Select
                width={1 / 4}
                mx={8}
                label='Função'
                placeholder='Selecione uma função'
                options={userRoles}
                mb={10}
                {...props}
              />
            )}
          />
          <Controller
            name='created_at'
            control={control}
            defaultValue=''
            render={props => (
              <Datepicker
                label='Criado em'
                placeholderText='dd/mm/yyyy'
                containerProps={{ width: 1 / 4, px: 8 }}
                width='100%'
                {...props}
              />
            )}
          />
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
    </FormProvider>
  )
}

export default UsersFilters