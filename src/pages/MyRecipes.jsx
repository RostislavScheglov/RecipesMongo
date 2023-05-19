import axios from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'
import { ShortRecipesList } from '../components/ShortRecipesList'
import styles from '../styles/shortRecipeBigOne.module.css'
import { ErrorsList } from '../components/ErrorsList'
export function MyRecipes() {
  const isAuth = useSelector(isAuthUser)
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState()

  //try catch
  const fetchMyRecipes = async () => {
    const { data } = await axios.get('/recipes/my').catch((err) => {
      setErr(err)
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

  // if (isLoading) {
  //   return <>Loading...</>
  // }

  return (
    <>
      <ErrorsList err={err} />
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
      />
    </>
  )
}
