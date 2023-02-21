import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getLoginInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorsList } from '../components/ErrorsList'
import { CustomTextField } from '../styles/customMuiStyles'

export function Login() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()
  const [showPass, setShowPass] = useState(false)

  const setTokenLocal = (data) => {
    if ('token' in data) {
      window.sessionStorage.setItem('token', data.token)
    }
  }

  const fetchLogin = (params) => {
    axios
      .post('/auth/login', params)
      .then((res) => {
        dispatch(getLoginInfo(res.data))
        setTokenLocal(res.data)
      })
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
      userPassword: '',
    },
    mode: 'onChange',
  })

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div id="loginContainer">
      <h1 className="pageTitle">Login</h1>
      <ErrorsList err={err} />
      <div className="loginFormContainer">
        <form
          id="loginForm"
          onSubmit={handleSubmit(fetchLogin)}
        >
          <CustomTextField
            type="email"
            variant="outlined"
            label="Email"
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
          />
          <CustomTextField
            type={showPass ? 'text' : 'password'}
            variant="outlined"
            label="Password"
            error={Boolean(errors.userPassword?.message)}
            helperText={errors.userPassword?.message}
            {...register('userPassword', { required: 'Password required' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            className="littleBtns"
            to="/forgotPassword"
          >
            Forgot Password?
          </Link>
          <button
            className="submitBtn"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}
