import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'

export function MyRecipes() {
  const isAuth = useSelector(isAuthUser)
  const [myRecipes, setMyRecipes] = useState()
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])

  const fetchMyRecipes = async () => {
    try {
      const { data } = await axios.get('/recipes?filter=my')
      setMyRecipes(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  useEffect(() => {
    fetchMyRecipes()
  }, [])

  if (!isAuth) {
    return <Navigate to="/user/login" />
  }

  return (
    <>
      <ShortRecipesList
        recipes={myRecipes}
        isLoading={isLoading}
        err={err}
      />
    </>
  )
}
