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
  const { usersRoles, isLoadingRoles } = useUser()

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

  const { isFetching: isLoadingUser } = useQuery(['userById', id], getUserById, {
    enabled: !!id,
    onSuccess: data =>
      reset({
        name: data?.name,
        email: data?.email,
        role_id: data?.role?.id,
        birthdate: data?.birthdate
      })
  })

  useEffect(() => {
    if (!!id) return
    reset({
      name: '',
      email: '',
      role_id: ''
    })
  }, [id, reset])

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser || isSubmitting, [
    isLoadingRoles,
    isLoadingUser,
    isSubmitting
  ])

  const onSubmit = async ({ confirmPassword, ...values }) => {
    try {
      id ? await updateUser(id, values) : await createUser(values)
      handleOpenModal({
        type: 'success',
        content: id ? 'Atualizado com sucesso' : 'Criado com sucesso',
        onClose: () => history.goBack()
      })
    } catch (err) {
      handleOpenModal({ type: 'error' })
      console.log(err)
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
      console.log(err)
    }
  }

  return (
    <Row px={[20, 0]} py={[20, 40]} width='100%' alignItems='center' justifyContent='center'>
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
          position='relative'
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
                error={errors?.role?.message}
                placeholder='Selecione uma função'
                options={usersRoles}
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
            >
              {id ? 'Salvar' : 'Criar'}
            </Button>
          </Row>
          {!!id && (
            <Button
              mt={62}
              width='100%'
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
          )}
        </Column>
      )}
    </Row>
  )
}

export default UserForm
