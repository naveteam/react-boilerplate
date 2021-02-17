import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import Text from 'components/Text'
import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Loader from 'components/Loader'
import Select from 'components/Select'

import { addOrEditUserResolver } from 'helpers/yup-schemas'
import { getUserById } from 'services/users'

const mockSelectOptions = [
  { label: 'função a', value: 'função a' },
  { label: 'função b', value: 'função b' },
  { label: 'função c', value: 'função c' },
  { label: 'função d', value: 'função d' }
]

const AddOrEditUser = () => {
  const { handleSubmit, register, errors, reset, setValue, control, watch } = useForm({
    resolver: addOrEditUserResolver
  })
  const { id } = useParams()
  const history = useHistory()

  // TODO: Get user data from API
  const { isLoading } = useQuery(['userById', id], getUserById, {
    enabled: !!id,
    onSuccess: data => reset({ name: data.name, email: data.email, role: data.role, birthdate: data.birthdate })
  })

  // TODO: Integration with API
  const onSubmit = async values => {
    try {
      console.log(values)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Row p={[20, 0]} backgroundColor='#f1f1f1' width='100%' height='100vh' alignItems='center' justifyContent='center'>
      {isLoading ? (
        <Loader />
      ) : (
        <Column
          p={30}
          width={['100%', 'auto']}
          backgroundColor='#ffff'
          as='form'
          borderRadius={5}
          boxShadow='2px 2px 2px 2px rgba(0, 0, 0, 0.1)'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Text fontWeight='bold' mb={20} fontSize={24} textAlign='center'>
            {id ? 'Editar usuário' : 'Criar usuário'}
          </Text>
          <Input
            label='Nome'
            name='name'
            ref={register}
            placeholder='Nome'
            error={errors?.name?.message}
            type='text'
            width='100%'
          />
          <Input
            label='Email'
            name='email'
            ref={register}
            placeholder='exemplo@nave.rs'
            error={errors?.email?.message}
            type='email'
            width='100%'
          />
          <Controller
            name='role'
            control={control}
            defaultValue=''
            render={props => (
              <Select
                label='Função'
                width='100%'
                error={errors?.role?.message}
                placeholder='Selecione uma função'
                options={mockSelectOptions}
                {...props}
              />
            )}
          />
          <Input
            label='Data de Nascimento'
            name='birthdate'
            ref={register}
            placeholder='dd/mm/aaaa'
            error={errors?.birthdate?.message}
            type='text'
            width='100%'
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />

          <Row flexWrap='wrap'>
            <Button
              width={['100%', 'regular']}
              fontWeight='bold'
              backgroundColor='#919191'
              mr={[0, 8]}
              mb={[8, 0]}
              type='button'
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
            <Button
              width={['100%', 'regular']}
              backgroundColor='purple'
              fontWeight='bold'
              ml={[0, 8]}
              mt={[8, 0]}
              type='submit'
            >
              {id ? 'Salvar' : 'Criar'}
            </Button>
          </Row>
        </Column>
      )}
    </Row>
  )
}

export default AddOrEditUser
