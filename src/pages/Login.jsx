import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getLoginInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { IconButton, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import { inputSyles } from '../styles/customMuiStyles'

export function Login() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const setTokenLocal = (data) => {
    if ('token' in data) {
      window.sessionStorage.setItem('token', data.token)
    }
  }

  const fetchLogin = (params) => {
    axios
      .post('/user/login', params)
      .then((res) => {
        dispatch(getLoginInfo(res.data))
        setTokenLocal(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        errorsSetter(err, setErr)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div className="formContainer">
        <h1 className="pageTitle">Login</h1>
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <form
          id="userDataForm"
          onSubmit={handleSubmit(fetchLogin)}
        >
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
            sx={{
              ...inputSyles,
            }}
          />
          <TextField
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
            sx={{
              ...inputSyles,
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
