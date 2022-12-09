import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'

export function AllRecipes() {
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)

  //try catch
  const fetchAllRecipes = async () => {
    const { data } = await axios.get('/recipes')
    setItem(data)
    setLoading(false)
  }

  //Make custom hook for getting data from server (incapsulate useEffect)
  useEffect(() => {
    fetchAllRecipes()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <ShortRecipesList
      items={items}
      isLoading={isLoading}
    />
  )
}
