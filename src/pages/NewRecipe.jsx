import axios from '../axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { isAuthUser } from '../redux/slices/users'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { Button, TextField, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import * as React from 'react'
import Add from '@mui/icons-material/Add'
import Delete from '@mui/icons-material/Delete'
import { ErrorsList } from '../components/ErrorsList'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import { CustomTextField } from '../styles/customMuiStyles'
import { createRef } from 'react'
import { checker } from './EditRecipe'

export function NewRecipe() {
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState()
  const [isCreated, setIsCreated] = useState(false)
  const [ingredients, setIngredient] = useState([])
  const [img, setImg] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const uploadImgRef = createRef()

  //NEW recipe did`t load after creation on main page(need to refresh page)

  const clickUploadInput = () => {
    // console.log(uploadImgRef)
    uploadImgRef.current.click()
  }

  const createNewRecipe = async (params) => {
    params.ingredients = ingredients

    // console.log(img)
    // console.log(typeof img)
    await axios
      .post('/recipes', params)
      .then((res) => {
        if (img !== '') {
          const formData = new FormData()
          formData.append('img', img)
          formData.append('id', res.data._id)
          axios.post('/recipes/upload', formData)
        }
        reset()
        setIngredient([])
        setIsCreated(true)
      })
      .catch((err) => {
        if ('message' in err.response.data) {
          setErr([err.response.data.message])
        }
        const x = err.response.data.errors.map((err) => err.msg)
        setErr(x)
      })
  }

  const imageChange = (e) => {
    const file = e.target.files[0]
    if (e.target.files && e.target.files.length > 0) {
      setImg(file)
      setSelectedImage(URL.createObjectURL(file))
    }
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

  // if (!isAuth) {
  //   return <Navigate to="/auth/login" />
  // }

  if (isCreated) {
    return <Navigate to="/recipes/myrecipes" />
  }

  return (
    <div className="recipeFormContainer">
      <ErrorsList err={err} />
      <h1 className="pageTitle">Create a new recipe </h1>
      <form
        id="recipeForm"
        onSubmit={handleSubmit(createNewRecipe)}
        encType="multipart/form-data"
      >
        <div>
          <input
            type="file"
            name="img"
            className="uploadImgInput"
            ref={uploadImgRef}
            onChange={imageChange}
          />
          {checker(selectedImage) ? (
            <img
              id="img"
              alt="Img"
              className="uploadedImg"
              onClick={clickUploadInput}
              src={selectedImage}
            />
          ) : (
            <div
              onClick={clickUploadInput}
              className="uploadImgContainer"
            ></div>
          )}
        </div>
        {/* <input
          type="file"
          name="img"
          className="uploadImgInput"
          ref={uploadImgRef}
          onChange={imageChange}
        />

        <div
          onClick={clickUploadInput}
          className="uploadImgContainer"
        >
          {selectedImage !== undefined && selectedImage !== null ? (
            <img
              className="uploadedImg"
              src={selectedImage}
              alt=""
            />
          ) : null}
        </div> */}
        <CustomTextField
          type="text"
          variant="outlined"
          label="Title"
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title required' })}
        />

        <CustomTextField
          type="text"
          variant="outlined"
          label="Description"
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('description', {
            required: 'Description required',
          })}
        />

        <CustomTextField
          type="text"
          variant="outlined"
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

        <ul className="ingredientsList">
          {ingredients.map((ingredient, index) => (
            <li
              className="ingredientContainer"
              key={index}
            >
              {ingredient}
              <ClearSharpIcon
                onClick={() => {
                  deleteIngredient(ingredient)
                }}
              ></ClearSharpIcon>
            </li>
          ))}
        </ul>

        <button
          className="submitBtn"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  )
}
