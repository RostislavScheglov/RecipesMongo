import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getRegistrInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export function Registration() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState([])
  const [isErr, setIsErr] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const fetchRegistr = async (params) => {
    axios
      .post('/auth/registration', params)
      .then((res) => {
        dispatch(getRegistrInfo(res.data))
        window.sessionStorage.setItem('token', res.data.token)
      })
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        setErr(x)
        setIsErr(true)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userName: '',
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
      <>
        {isErr ? (
          <div>
            {err.map((err, index) => (
              <Alert
                key={index}
                severity="error"
              >
                {err}
              </Alert>
            ))}
          </div>
        ) : null}
      </>
      <form onSubmit={handleSubmit(fetchRegistr)}>
        <TextField
          type="text"
          variant="standard"
          label="Full Name"
          error={Boolean(errors.userName?.message)}
          helperText={errors.userName?.message}
          {...register('userName', { required: 'Full Name required' })}
        />
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
