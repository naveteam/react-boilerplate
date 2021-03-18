import React, { useMemo, useEffect } from 'react'
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

import { userFormResolver } from 'helpers/yup-schemas'
import { getUserById, updateUser, createUser, deleteUser } from 'services/users'
import { useModal } from 'context/modal-context'
import { useUser } from 'context/user-context'
import { dateMask } from 'helpers'

const UserForm = () => {
  const { handleOpenModal, handleCloseModal } = useModal()
  const { userRoles, isLoadingRoles } = useUser()

  const {
    handleSubmit,
    register,
    errors,
    reset,
    control,
    formState: { isSubmitting }
  } = useForm({
    resolver: userFormResolver
  })

  const { id } = useParams()
  const history = useHistory()

  const { isFetching: isLoadingUser, data: user } = useQuery(['userById', id], getUserById, {
    enabled: !!id
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      role_id: user?.role?.id || '',
      birthdate: user?.birthdate || ''
    })
  }, [user, reset])

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser, [isLoadingRoles, isLoadingUser])

  const onSubmit = async ({ confirmPassword, ...values }) => {
    try {
      id ? await updateUser(id, values) : await createUser(values)
      handleOpenModal({
        type: 'success',
        content: id ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso',
        onClose: () => history.goBack()
      })
    } catch (err) {
      handleOpenModal({ type: 'error' })
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id)
      handleCloseModal()
      history.goBack()
    } catch (err) {
      handleCloseModal()
      handleOpenModal({ type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Column alignItems='center'>
      {!!id && (
        <Row width='100%' justifyContent='flex-end'>
          <Button
            backgroundColor='red'
            type='button'
            fontWeight='bold'
            onClick={() =>
              handleOpenModal({
                type: 'confirmation',
                title: 'Atenção',
                content: 'Tem certeza de que deseja excluir o usuário?',
                onConfirm: handleDeleteUser
              })
            }
          >
            Excluir
          </Button>
        </Row>
      )}
      <Column as='form' maxWidth='500px' borderRadius={5} onSubmit={handleSubmit(onSubmit)} position='relative'>
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
        <Input
          label='Senha'
          name='password'
          ref={register}
          placeholder='*********'
          error={errors?.password?.message}
          type='password'
          width='100%'
        />
        <Input
          label='Confirme a senha'
          name='confirmPassword'
          ref={register}
          placeholder='*********'
          error={errors?.confirmPassword?.message}
          type='password'
          width='100%'
        />
        <Controller
          name='role_id'
          control={control}
          defaultValue=''
          render={props => (
            <Select
              label='Função'
              width='100%'
              error={errors?.role_id?.message}
              placeholder='Selecione uma função'
              options={userRoles}
              mb={10}
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
          mask={dateMask}
        />

        <Row mt={14} flexWrap='wrap'>
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
            backgroundColor='primary.main'
            fontWeight='bold'
            ml={[0, 8]}
            mt={[8, 0]}
            type='submit'
            disabled={isSubmitting}
          >
            {id ? 'Salvar' : 'Criar'}
          </Button>
        </Row>
      </Column>
    </Column>
  )
}

export default UserForm
