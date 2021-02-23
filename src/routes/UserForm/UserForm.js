import React, { useMemo, useState, Fragment } from 'react'
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
import { getUserById, getAllRoles, updateUser, createUser } from 'services/users'
// import { formatDate } from 'helpers'

const formatUsersRoles = roles => roles.map(item => ({ label: item.role, value: item.id }))

const AddOrEditUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [usersRoles, setUsersRoles] = useState([])

  const { handleSubmit, register, errors, reset, control } = useForm({
    resolver: addOrEditUserResolver
  })

  const { id } = useParams()
  const history = useHistory()

  const { isLoading: isLoadingRoles } = useQuery('getRoles', getAllRoles, {
    onSuccess: ({ results }) => setUsersRoles(formatUsersRoles(results))
  })

  const { isLoading: isLoadingUser } = useQuery(['userById', id], getUserById, {
    enabled: !!id,
    onSuccess: data =>
      reset({
        name: data?.name,
        email: data?.email,
        role: { label: data?.role?.role, value: data?.role?.id }
        // birthdate: data?.birthdate
      })
  })

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser || isSubmitting, [
    isLoadingRoles,
    isLoadingUser,
    isSubmitting
  ])

  const onSubmit = async values => {
    try {
      setIsSubmitting(true)
      const { name, password, /* birthdate, */ email, role } = values

      const data = {
        name,
        password,
        email,
        // birthdate: formatDate(birthdate),
        role_id: Number(role.value)
      }
      id ? await updateUser(id, data) : await createUser(data)
      setFeedbackMessage(id ? 'Atualizado com sucesso' : 'Criado com sucesso')
    } catch (err) {
      setFeedbackMessage('Ocorreu um erro')
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Row px={[20, 0]} py={[20, 40]} backgroundColor='#f1f1f1' width='100%' alignItems='center' justifyContent='center'>
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
          {feedbackMessage ? (
            <Fragment>
              <Text fontWeight='bold' mb={20} fontSize={24} textAlign='center'>
                {feedbackMessage}
              </Text>
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
            </Fragment>
          ) : (
            <Fragment>
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
                name='role'
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
              {/* <Input
                label='Data de Nascimento'
                name='birthdate'
                ref={register}
                placeholder='dd/mm/aaaa'
                error={errors?.birthdate?.message}
                type='text'
                width='100%'
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              /> */}

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
                  backgroundColor='purple'
                  fontWeight='bold'
                  ml={[0, 8]}
                  mt={[8, 0]}
                  type='submit'
                >
                  {id ? 'Salvar' : 'Criar'}
                </Button>
              </Row>
            </Fragment>
          )}
        </Column>
      )}
    </Row>
  )
}

export default AddOrEditUser
