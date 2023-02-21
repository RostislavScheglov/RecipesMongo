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
import { ErrorsList } from '../components/ErrorsList'
import { CustomTextField } from '../styles/customMuiStyles'

export function Registration() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState([])
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
    <div id="loginContainer">
      <h1 className="pageTitle">Registartion</h1>
      <ErrorsList err={err} />
      <div className="loginFormContainer">
        <form
          id="loginForm"
          onSubmit={handleSubmit(fetchRegistr)}
        >
          <CustomTextField
            type="text"
            variant="outlined"
            label="Full Name"
            error={Boolean(errors.userName?.message)}
            helperText={errors.userName?.message}
            {...register('userName', { required: 'Full Name required' })}
          />
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
          <Button
            type="submit"
            disabled={!isValid}
            variant="outlined"
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  )
}
