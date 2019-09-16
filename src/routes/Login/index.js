import React from 'react'
import { Formik, Form, Field } from 'formik'

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
          handleReset,
        } = props
        return (
          <Form onSubmit={handleSubmit}>
            <label htmlFor='email' style={{ display: 'block' }}>
              Email
            </label>
            <Field id='email' placeholder='Enter your email' type='text' name='email' />
            <Field id='password' placeholder='Enter your password' type='password' name='password' />
            <button type='submit' disabled={isSubmitting}>
              entrar
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Login
