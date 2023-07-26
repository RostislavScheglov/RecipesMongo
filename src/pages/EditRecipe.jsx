import axios from '../axios'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { RecipeMainFields } from '../components/RecipeMainFields'
import { errorsSetter } from '../components/ErrorsList'

export const checker = (el) => el !== undefined && el !== null && el !== ''

export function EditRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [err, setErr] = useState([])
  const [isRedirect, setIsRedirect] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [ingredients, setIngredient] = useState([])
  const [img, setImg] = useState('')

  const editRecipe = async (params) => {
    try {
      params.ingredients = ingredients
      await axios.patch(`/recipes/edit/${id}/${userInfo}`, params)
      if (img !== '') {
        const imgObject = { img: img, id: id }
        await axios.post('/recipes/upload', imgObject)
      }
      setIsRedirect(true)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const getOneRecipe = async (id) => {
    axios
      .get(`/recipes/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        errorsSetter(err, setErr)
      })
  }

  useEffect(() => {
    getOneRecipe(id)
  }, [id])

  const deleteImg = (setImgUrl) => {
    axios
      .delete(`recipes/img/${id}`)
      .then(setImgUrl(''))
      .catch((err) => console.log(err))
  }

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
      <h1 className="pageTitle">Edit recipe</h1>
      <RecipeMainFields
        err={err}
        data={data}
        submitForm={editRecipe}
        ingredients={ingredients}
        setIngredient={setIngredient}
        setImg={setImg}
        deleteImg={deleteImg}
        isLoading={isLoading}
      />
    </>
  )
}
