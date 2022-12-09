import axios, { domain } from '../axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { Button, TextField, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import * as React from 'react'
import Add from '@mui/icons-material/Add'
import Delete from '@mui/icons-material/Delete'
import { useEffect } from 'react'
import { ErrorsList } from '../components/ErrorsList'

export function EditRecipe() {
  const { id } = useParams()
  const [err, setErr] = useState([])
  const [isImg, setIsImg] = useState(true)
  const [isErr, setIsErr] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)
  const [ingredients, setIngredient] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  const editRecipe = async (params) => {
    params.ingredients = ingredients
    await axios
      .patch(`/recipes/${id}`, params)
      .then(() => {
        if (params.img[0] !== undefined) {
          const formData = new FormData()
          formData.append('img', params.img[0])
          formData.append('id', id)
          axios.post('/upload', formData)
        }
        setIsRedirect(true)
      })
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        setErr(x)
        setIsErr(true)
      })
  }

  //try catch
  const getOneRecipe = async (id) => {
    const { data } = await axios.get(`/recipes/${id}`).catch((err) => {
      console.log('Edit trouble')
      console.log(err)
    })
    setValue('title', data.title)
    setValue('description', data.description)
    setImgUrl(data.recipeImage)
    setIngredient(data.ingredients)
  }

  useEffect(() => {
    getOneRecipe(id)
  }, [])

  //Refactor (same function in NewRecipe Page)
  const deleteIngredient = (ingredient) => {
    const index = ingredients.indexOf(ingredient)
    setIngredient((ingredients) => {
      const x = [...ingredients]
      x.splice(index, 1)
      console.log(ingredients)
      return x
    })
  }

  const deleteImg = (imgUrl) => {
    console.log(imgUrl)
    axios
      .delete(imgUrl)
      .then(setIsImg(false))
      .catch((err) => console.log(err))
  }

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setError,
    setValue,
    formState: { errors },
  } = useForm({})

  if (isRedirect) {
    return (
      <Navigate
        replace={true}
        to={`/recipes/myrecipes`}
      />
    )
  }

  return (
    <>
      Editttt
      <ErrorsList
        err={err}
        isErr={isErr}
      />
      <form onSubmit={handleSubmit(editRecipe)}>
        <TextField
          type="text"
          variant="standard"
          label="Title"
          focused={true}
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title required' })}
        />
        <div>
          {isImg ? (
            <img
              src={`${domain}${imgUrl}`}
              id="img"
              alt="Img"
            ></img>
          ) : null}
          <input
            type="file"
            name="img"
            {...register('img')}
            // ref={inputRef}
            // onChange={fetchImg}
          />
          <Button
            variant="outlined"
            onClick={() => deleteImg(imgUrl)}
          >
            Delete
          </Button>
        </div>
        <TextField
          type="text"
          variant="standard"
          label="Description"
          focused={true}
          error={Boolean(errors.description?.message)}
          helperText={errors.description?.message}
          {...register('description', { required: 'Description required' })}
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
          onClick={() => setIsRedirect(true)}
        >
          Cancle
        </Button>
        <Button
          type="submit"
          variant="outlined"
        >
          Edit
        </Button>
      </form>
    </>
  )
}
