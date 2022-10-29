import axios from '../axios'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import * as React from 'react'
import Add from '@mui/icons-material/Add'
import Delete from '@mui/icons-material/Delete'

export function NewRecipe() {
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()
  const [isErr, setIsErr] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [imgUrl, setImgUrl] = useState(false)
  const [img, setImg] = useState()
  const [ingredients, setIngredient] = useState([])
  const inputRef = useRef(null)

  const createNewRecipe = async (params) => {
    params.ingredients = ingredients
    const formData = new FormData()
    formData.append('img', params.img[0])
    await axios
      .post('/recipes', params)
      .then((res) => {
        formData.append('id', res.data._id)
        axios.post('/upload', formData)
        reset()
        setIngredient([])
        setIsCreated(true)
      })
      .catch((err) => {
        if ('message' in err.response.data) {
          setErr([err.response.data.message])
          setIsErr(true)
        }
        const x = err.response.data.errors.map((err) => err.msg)
        setErr(x)
        setIsErr(true)
      })
  }

  const deleteIngredient = (ingredient) => {
    const index = ingredients.indexOf(ingredient)
    ingredients.splice(index, 1)
    setIngredient((ingredients) => [...ingredients])
  }

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      ingredients: '',
    },
  })

  // const fetchImg = async (event) => {
  //   const formData = new FormData()
  //   try {
  //     const file = event.target.files[0]
  //     setImg(file)
  //     console.log(file)
  //     // formData.append("img", file)
  //     // const { data } = await axios.post("/upload", formData)
  //     // setImgUrl(data.url)
  //   } catch (err) {
  //     setErr([err])
  //     setIsErr(true)
  //   }
  // }

  // const deleteImg = async (imgUrl) => {
  //   try {
  //     await axios.delete("./upload", imgUrl)
  //     setImgUrl(false)
  //   } catch (err) {
  //     setErr([err])
  //     setIsErr(true)
  //   }
  // }

  if (!isAuth) {
    return <Navigate to="/auth/login" />
  }

  if (isCreated) {
    return <Navigate to="/recipes/myrecipes" />
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

      <form
        onSubmit={handleSubmit(createNewRecipe)}
        encType="multipart/form-data"
      >
        <TextField
          type="text"
          variant="standard"
          label="Title"
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title required' })}
        />

        <input
          type="file"
          name="img"
          {...register('img')}
          // ref={inputRef}
          // onChange={fetchImg}
        />

        <TextField
          type="text"
          variant="standard"
          label="Description"
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('description', {
            required: 'Description required',
          })}
        />

        <TextField
          type="text"
          variant="standard"
          label="Ingredient"
          error={Boolean(errors.ingredients?.message)}
          helperText={errors.ingredients?.message}
          {...register('ingredients')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Add
                    onClick={() => {
                      if (getValues('ingredients').length >= 3) {
                        setIngredient((ingredient) => [
                          ...ingredient,
                          getValues('ingredients'),
                        ])
                        resetField('ingredients')
                      } else {
                        setError('ingredients', {
                          type: 'custom',
                          message:
                            'Minimum ingredient lenght should be 3 symbols',
                        })
                      }
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div>
          <ol>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
                <Delete
                  onClick={() => {
                    deleteIngredient(ingredient)
                  }}
                ></Delete>
              </li>
            ))}
          </ol>
        </div>
        <Button
          type="submit"
          variant="outlined"
        >
          Enter
        </Button>
      </form>
    </>
  )
}
