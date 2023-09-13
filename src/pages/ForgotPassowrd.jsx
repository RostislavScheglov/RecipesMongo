import axios from '../axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import { inputSyles } from '../styles/customMuiStyles'
import { TextField } from '@mui/material'

export function ForgotPassword() {
  const [err, setErr] = useState()
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLogin = (params) => {
    axios
      .post('/user/forgotPassword', params)
      .then(() => {
        setIsSent(true)
        setIsLoading(true)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsSent(false)
        errorsSetter(err, setErr)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  return (
    <>
      <div className="formContainer">
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <form
          id="userDataForm"
          onSubmit={handleSubmit(fetchLogin)}
        >
          {isSent ? (
            <h2 className="forgotPassConfirmation">
              Link was sent to your email!
            </h2>
          ) : null}

          <p className="forgotPassEmailTitle">Enter your email for recovery</p>
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
