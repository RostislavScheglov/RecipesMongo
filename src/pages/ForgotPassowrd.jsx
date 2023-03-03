import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getLoginInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { ErrorsList } from '../components/ErrorsList'

export function ForgotPassword() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()

  const fetchLogin = (params) => {
    axios
      .post('/auth/forgotPassword', params)
      // .then((res) => {
      //   dispatch(getLoginInfo(res.data))
      // })
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        setErr((e) => [...x])
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userEmail: '',
    },
    mode: 'onChange',
  })

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <>
      <ErrorsList err={err} />
      <div className="loginFormContainer">
        <form
          id="loginForm"
          onSubmit={handleSubmit(fetchLogin)}
        >
          <p id="loginHeader">reset password</p>
          <TextField
            type="email"
            variant="standard"
            label="enter your email"
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
          />
          <Button
            type="submit"
            disabled={!isValid}
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}
