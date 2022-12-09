import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getLoginInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorsList } from '../components/ErrorsList'

export function Login() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()
  const [isErr, setIsErr] = useState(false)
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
        setIsErr(true)
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
    <>
      <ErrorsList
        err={err}
        isErr={isErr}
      />
      <form onSubmit={handleSubmit(fetchLogin)}>
        <TextField
          type="email"
          variant="standard"
          label="Email"
          error={Boolean(errors.userEmail?.message)}
          helperText={errors.userEmail?.message}
          {...register('userEmail', { required: 'Email required' })}
        />
        <TextField
          type={showPass ? 'text' : 'password'}
          variant="standard"
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
        <Button
          type="submit"
          disabled={!isValid}
          variant="outlined"
        >
          Enter
        </Button>
      </form>
    </>
  )
}
