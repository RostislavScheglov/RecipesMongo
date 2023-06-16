import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { ErrorsList } from '../components/ErrorsList'
import { CustomTextField } from '../styles/customMuiStyles'

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
    mode: 'onChange',
  })

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="loginFormContainer">
        <ErrorsList err={err} />
        <form
          id="loginForm"
          onSubmit={handleSubmit(fetchLogin)}
        >
          <p id="loginHeader">send password to email</p>
          <CustomTextField
            type="email"
            variant="outlined"
            label="Email"
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
          />
          <button
            className="submitBtn"
            type="submit"
            disabled={!isValid}
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}
