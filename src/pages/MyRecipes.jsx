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
      const x = err.response.data.map((err) => err.msg)
      setErr(x)
    })
    setItem(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMyRecipes()
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
