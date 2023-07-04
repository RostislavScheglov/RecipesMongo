import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMeInfo, getMyAvatar, isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import { inputSyles } from '../styles/customMuiStyles'
import { UploadImg } from '../components/UploadImg'
import { TextField } from '@mui/material'

export function EditPersonalInfo() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState([])
  const [isEdited, setIsEdited] = useState(false)
  const [isLoading, setLoading] = useState(true)
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
          axios.post('auth/uploads/usersImgs', formData).then((res) => {
            dispatch(getMyAvatar(res.data.imgUrl))
          })
        }
        dispatch(getMeInfo(res.data))
      })
      .then(() => setIsEdited(true))
      .catch((err) => {
        setLoading(false)
        errorsSetter(err, setErr)
      })
  }

  const getMe = () => {
    axios
      .get('/auth/me')
      .then((res) => {
        setValue('userName', res.data.userName)
        setValue('userEmail', res.data.userEmail)
        setImgUrl(res.data.userImage)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        errorsSetter(err, setErr)
      })
  }
  useEffect(() => {
    getMe()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({})

  const deleteImg = (imgUrl, setImgUrl) => {
    axios
      .delete(`auth/img/${imgUrl}`)
      .then(setImgUrl(''))
      .catch((err) => errorsSetter(err, setErr))
  }
  if (!isAuth || isEdited) {
    return <Navigate to="/" />
  }

  return (
    <div id="loginContainer">
      <h1 className="pageTitle">Edit Personal Info</h1>

      <div className="loginFormContainer">
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <form
          id="loginForm"
          onSubmit={handleSubmit(editPersonalInfo)}
        >
          <UploadImg
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            setImg={setImg}
            deleteImg={deleteImg}
          />
          <TextField
            type="text"
            variant="outlined"
            label="Full Name"
            focused={true}
            error={Boolean(errors.userName?.message)}
            helperText={errors.userName?.message}
            {...register('userName', { required: 'Full Name required' })}
            sx={{
              ...inputSyles,
            }}
          />
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            focused={true}
            error={Boolean(errors.userEmail?.message)}
            helperText={errors.userEmail?.message}
            {...register('userEmail', { required: 'Email required' })}
            sx={{
              ...inputSyles,
            }}
          />

          <button
            className="submitBtn"
            id="submitCancleBtn"
            type="submit"
            variant="outlined"
            onClick={() => setIsEdited(true)}
          >
            Cancle
          </button>
          <button
            className="submitBtn"
            type="submit"
            variant="outlined"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
