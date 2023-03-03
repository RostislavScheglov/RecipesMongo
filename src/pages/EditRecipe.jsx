import axios, { domain } from '../axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import * as React from 'react'
import Add from '@mui/icons-material/Add'
import { useEffect } from 'react'
import { ErrorsList } from '../components/ErrorsList'
import { useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { CustomTextField } from '../styles/customMuiStyles'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import { useRef } from 'react'

export function EditRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [err, setErr] = useState([])
  const [isImg, setIsImg] = useState(true)
  const [isRedirect, setIsRedirect] = useState(false)
  const [ingredients, setIngredient] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState()

  const uploadImgRef = useRef()

  const editRecipe = async (params) => {
    params.ingredients = ingredients
    console.log(params)
    // await axios
    //   .patch(`/recipes/edit/${id}/${userInfo}`, params)
    //   .then(() => {
    //     if (params.img[0] !== undefined) {
    //       const formData = new FormData()
    //       formData.append('img', params.img[0])
    //       formData.append('id', id)
    //       axios.post('/recipes/upload', formData)
    //     }
    //     setIsRedirect(true)
    //   })
    //   .catch((err) => {
    //     const x = err.response.data.map((err) => err.msg)
    //     setErr(x)
    //   })
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
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
  }
  const clickUploadInput = () => {
    uploadImgRef.current.click()
  }
  const deleteImg = (imgUrl) => {
    console.log(imgUrl)
    axios
      .delete(`recipes/img/${imgUrl}`)
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
    <div className="recipeFormContainer">
      <h1 className="pageTitle">Edit recipe</h1>
      <ErrorsList err={err} />
      <form
        id="recipeForm"
        onSubmit={handleSubmit(editRecipe)}
      >
        <div className="imgActionContainer">
          <button
            className="littleBtns"
            variant="outlined"
            type="button"
            onClick={() => deleteImg(imgUrl)}
            // onClick={() => console.log(imgUrl)}
          >
            Delete
          </button>
          <input
            type="file"
            name="img"
            className="uploadImgInput"
            {...register('img')}
            ref={uploadImgRef}
            onChange={imageChange}
          />

          {isImg ? (
            <div className="bigImgContainer">
              <img
                className="uploadedImg"
                src={`${domain}${imgUrl}`}
                alt="Img"
              />
            </div>
          ) : (
            <div
              onClick={clickUploadInput}
              className="uploadImgContainer"
            >
              <img
                id="img"
                alt="Img"
                className="uploadedImg"
                src={selectedImage}
              />
            </div>
          )}

          {/* {isImg ? (
            <img
              className="uploadedImg"
              src={`${domain}${imgUrl}`}
              id="img"
              alt="Img"
            ></img>
          ) : null} */}
        </div>

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
          Edit
        </button>
      </form>
    </div>
  )
}
