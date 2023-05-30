import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getRegistrInfo, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import { CustomTextField } from '../styles/customMuiStyles'
import { UploadImg } from '../components/UploadImg'

export function EditPersonalInfo() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState([])
  const [showPass, setShowPass] = useState(false)
  const [img, setImg] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const editPersonalInfo = async (params) => {
    axios
      .patch('/auth/me/edit', params)
      .then((res) => {
        if (img !== '') {
          const formData = new FormData()
          formData.append('img', img)
          formData.append('id', res.data._id)
          axios.post('auth/uploads/usersImgs', formData)
        }
      })
      .catch((err) => {
        errorsSetter(err, setErr)
      })
  }

  const getMe = () => {
    axios
      .get('/auth/me')
      .then((res) => {
        setValue('userName', res.data.userName)
        setValue('userEmail', res.data.userEmail)
        // setValue('userPassword', res.data.userPassword)
        setImgUrl(res.data.userImage)
      })
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        console.log(x)
        // console.log([err.response.data.message])
      })
  }
  useEffect(() => {
    getMe()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  // if (isAuth) {
  //   return <Navigate to="/" />
  // }

  return (
    <div id="loginContainer">
      <h1 className="pageTitle">Edit Personal Info</h1>

      <div className="loginFormContainer">
        <ErrorsList err={err} />
        <form
          id="loginForm"
          onSubmit={handleSubmit(editPersonalInfo)}
        >
          <UploadImg
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            setImg={setImg}
            // deleteImg={props.deleteImg}
          />
          <CustomTextField
            type="text"
            variant="outlined"
            label="Full Name"
            focused={true}
            error={Boolean(errors.userName?.message)}
            helperText={errors.userName?.message}
            {...register('userName', { required: 'Full Name required' })}
          />
          <CustomTextField
            type="email"
            variant="outlined"
            label="Email"
            focused={true}
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
          />
          {/* <CustomTextField
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
          /> */}
          <Button
            type="submit"
            disabled={!isValid}
            variant="outlined"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
