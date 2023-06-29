import axios from '../axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import { CustomTextField } from '../styles/customMuiStyles'

export function ResetPassword() {
  const [err, setErr] = useState()
  const [showPass, setShowPass] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const params = useParams()

  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t))
  }
  const resetPassword = (newPass) => {
    axios
      .post(`/auth/resetPassword/${params.userId}/${params.token}`, newPass)
      .then((res) => {
        setIsReset(true)
        setLoading(true)
        delay(5000).then(() => setIsRedirect(true))
        reset()
      })
      .catch((err) => {
        errorsSetter(err, setErr)
        setLoading(false)
      })
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  if (isRedirect) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div id="loginContainer">
      <div className="loginFormContainer">
        {isReset ? (
          <div id="resetPassConfirm">
            <h2 id="sentLinkConfirm">Your password has been reset!</h2>
            <span id="sentLinkConfirm">Ridirecting to login page....</span>
          </div>
        ) : null}
        <h1 className="pageTitle">Reset Password</h1>
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <form
          id="loginForm"
          onSubmit={handleSubmit(resetPassword)}
        >
          <CustomTextField
            type={showPass ? 'text' : 'password'}
            variant="outlined"
            label="New password"
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
          <CustomTextField
            type={showPass ? 'text' : 'password'}
            variant="outlined"
            label="New passwrod"
            error={Boolean(errors.userPassword?.message)}
            helperText={errors.userPassword?.message}
            {...register('userPassword2', { required: 'Password required' })}
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
          <button
            className="submitBtn"
            type="submit"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}
