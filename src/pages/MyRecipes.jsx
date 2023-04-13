import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import styles from '../styles/shortRecipeListSyle.module.css'
export function MyRecipes() {
  const isAuth = useSelector(isAuthUser)
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)

  //try catch
  const fetchMyRecipes = async () => {
    const { data } = await axios.get('/recipes/my', {
      headers: {
        'Recipes-Filter': 'My',
      },
    })
    setItem(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMyRecipes()
  }, [])

  if (!isAuth) {
    return <Navigate to="/auth/login" />
  }

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <ShortRecipesList
      items={items}
      isLoading={isLoading}
      styles={styles}
    />
  )
}
