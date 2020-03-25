import React from 'react'
import { Formik, Form, Field } from 'formik'

import Row from 'components/Row'
import Text from 'components/Text'

import { useAuth } from 'context/auth-context'

const Login = () => {
  const { login } = useAuth()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        const response = await login(values)
        console.log(response)
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props
        return (
          <Form onSubmit={handleSubmit}>
            <Text htmlFor='email' as='label' variant='big'>
              Email
            </Text>
            <Row>
              <Field id='email' placeholder='Enter your email' type='text' name='email' />
              <Field id='password' placeholder='Enter your password' type='password' name='password' />
              <button type='submit' disabled={isSubmitting}>
                entrar
              </button>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Login
