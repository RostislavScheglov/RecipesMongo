import { useForm } from 'react-hook-form'
import { ErrorsList } from './ErrorsList'
import { UploadImg } from './UploadImg'
import { inputSyles } from '../styles/customMuiStyles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../styles/componentsStyles/RecipeMainFields.css'

export const RecipeMainFields = (props) => {
  const [isRedirect, setIsRedirect] = useState(false)
  const [imgUrl, setImgUrl] = useState('')

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setError,
    setValue,
    formState: { errors },
  } = useForm()

  const deleteIngredient = (ingredient) => {
    const ingredientIndex = props.ingredients.indexOf(ingredient)
    props.setIngredient((ingredients) => {
      const allIngredients = [...ingredients]
      allIngredients.splice(ingredientIndex, 1)
      return allIngredients
    })
  }

  const setValues = (data) => {
    if (data.length === 0) return
    setValue('title', data.title)
    setValue('description', data.description)
    setValue('directions', data.directions)
    setImgUrl(data.recipeImage)
    props.setIngredient(data.ingredients)
  }

  useEffect(() => {
    if (props.data !== undefined) setValues(props.data)
  }, [props.isLoading])

  if (isRedirect) {
    return (
      <Navigate
        replace={true}
        to={`/recipes/myrecipes`}
      />
    )
  }

  if (props.isLoading) {
    return (
      <div className="noUserInfo">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="recipeFormContainer">
      <ErrorsList
        err={props.err}
        isLoading={props.isLoading}
      />
      <form
        id="recipeForm"
        onSubmit={handleSubmit(props.submitForm)}
      >
        <UploadImg
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImg={props.setImg}
          deleteImg={props.deleteImg}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Title"
          id="titleInput"
          focused={true}
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title required' })}
          sx={{
            ...inputSyles,
          }}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Ingredient"
          focused={true}
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
                        props.setIngredient((ingredient) => [
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
          sx={{
            ...inputSyles,
          }}
        />
        <ul className="ingredientsList">
          {props.ingredients.map((ingredient, index) => (
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
        <TextField
          id="recipeDescription"
          type="text"
          variant="outlined"
          label="Description"
          multiline={true}
          rows={5}
          focused={true}
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('description', { required: 'Description required' })}
          sx={{
            ...inputSyles,
          }}
        />
        <TextField
          id="recipeDescription"
          type="text"
          variant="outlined"
          label="Directions"
          multiline={true}
          rows={8}
          focused={true}
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('directions', { required: 'Directions required' })}
          sx={{
            ...inputSyles,
          }}
        />
        <button
          className="submitBtn"
          id="submitCancleBtn"
          type="submit"
          variant="outlined"
          onClick={() => setIsRedirect(true)}
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
  )
}
