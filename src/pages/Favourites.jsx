import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import styles from '../styles/shortRecipeBigOne.module.css'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'

export function Favourites() {
  const isAuth = useSelector(isAuthUser)

  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])

  //try catch
  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get('/recipes/favourite')
      console.log(data)
      setItem(data)
      setLoading(false)
    } catch (err) {
      errorsSetter(err, setErr)
      // const x = err.response.data.map((err) => err.msg)
      // setErr(x)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  // if (!isAuth) {
  //   return <Navigate to="/auth/login" />
  // }

  return (
    <>
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
        err={err}
      />
    </>
  )
}
