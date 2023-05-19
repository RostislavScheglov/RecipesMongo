import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import styles from '../styles/shortRecipeBigOne.module.css'
import { ErrorsList } from '../components/ErrorsList'

export function Favourites() {
  const isAuth = useSelector(isAuthUser)

  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)

  //try catch
  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get('/recipes/favourite')
      console.log(data)
      setItem(data)
      setLoading(false)
    } catch (err) {}
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  if (!isAuth) {
    return <Navigate to="/auth/login" />
  }

  return (
    <>
      {/* <ErrorsList err={err} /> */}
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
      />
    </>
  )
}
