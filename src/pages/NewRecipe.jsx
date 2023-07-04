import axios from '../axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { isAuthUser } from '../redux/slices/users'
import { Navigate } from 'react-router-dom'
import * as React from 'react'
import { RecipeMainFields } from '../components/RecipeMainFields'
import { errorsSetter } from '../components/ErrorsList'

export function NewRecipe() {
  const isAuth = useSelector(isAuthUser)
  const [err, setErr] = useState([])
  const [isCreated, setIsCreated] = useState(false)
  const [ingredients, setIngredient] = useState([])
  const [img, setImg] = useState('')

  const createNewRecipe = async (params) => {
    try {
      params.ingredients = ingredients
      const res = await axios.post('/recipes', params)
      if (img !== '') {
        const formData = new FormData()
        formData.append('img', img)
        formData.append('id', res.data._id)
        await axios.post('/recipes/uploads/recipesImgs', formData)
      }
      setIsCreated(true)
    } catch (err) {
      errorsSetter(err, setErr)
    }
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" />
  }

  if (isCreated) {
    return <Navigate to="/recipes/myrecipes" />
  }

  return (
    <>
      <h2 className="pageTitle">Create a new recipe</h2>
      <RecipeMainFields
        err={err}
        submitForm={createNewRecipe}
        ingredients={ingredients}
        setIngredient={setIngredient}
        setImg={setImg}
      />
    </>
  )
}
