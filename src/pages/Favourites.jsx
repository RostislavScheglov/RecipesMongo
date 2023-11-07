import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'

export function Favourites() {
  const isAuth = useSelector(isAuthUser)
  const [favRecipes, setFavRecipes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])

  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get('/recipes?filter=favourite')
      setFavRecipes(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  if (!isAuth) {
    return <Navigate to="/user/login" />
  }

  return (
    <>
      <ShortRecipesList
        recipes={favRecipes}
        isLoading={isLoading}
        err={err}
      />
    </>
  )
}
