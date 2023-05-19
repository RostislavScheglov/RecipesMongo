import { useForm } from 'react-hook-form'
import { ErrorsList } from './ErrorsList'
import { UploadImg } from './UploadImg'
import { CustomTextField } from '../styles/customMuiStyles'
import { IconButton, InputAdornment } from '@mui/material'
import { Add } from '@mui/icons-material'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

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
    const index = props.ingredients.indexOf(ingredient)
    props.setIngredient((ingredients) => {
      const x = [...ingredients]
      x.splice(index, 1)
      console.log(ingredients)
      return x
    })
  }

  const setValues = (data) => {
    setValue('title', data.title)
    setValue('description', data.description)
    setImgUrl(data.recipeImage)
    props.setIngredient(data.ingredients)
  }
  useEffect(() => {
    if (props.data !== undefined) {
      setValues(props.data)
    }
    return
  }, [props.data])

  if (isRedirect) {
    return (
      <Navigate
        replace={true}
        to={`/recipes/myrecipes`}
      />
    )
  }

  return (
    <div className="recipeFormContainer">
      {/* <button
        onClick={() => {
          console.log(props.data)
        }}
      ></button> */}
      <ErrorsList err={props.err} />
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
        <CustomTextField
          type="text"
          variant="outlined"
          label="Title"
          focused={true}
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title required' })}
        />
        <CustomTextField
          type="text"
          variant="outlined"
          label="Description"
          focused={true}
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('description', { required: 'Description required' })}
        />
        <CustomTextField
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
        />
        <ul className="ingredientsList">
          {props.ingredients?.map((ingredient, index) => (
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
