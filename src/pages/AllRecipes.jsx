import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { ErrorsList } from '../components/ErrorsList'

import styles from '../styles/shortRecipeBigOne.module.css'

export function AllRecipes() {
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)

  //try catch
  const fetchAllRecipes = async () => {
    try {
      const { data } = await axios.get('/recipes/all', {
        headers: {
          'Recipes-Filter': 'All',
        },
      })
      setItem(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  //rework with navigate or link
  const randomRecipe = (allitems) => {
    const allIds = allitems.map((item) => item._id)
    const randomId = allIds[Math.floor(Math.random() * items.length)]
    window.location.href = `http://localhost:3000/recipes/${randomId}`
  }

  //Make custom hook for getting data from server (incapsulate useEffect)
  useEffect(() => {
    fetchAllRecipes()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="feedContainer">
      {/* <ErrorsList err={err} /> */}
      <div className="randomRecip">
        <h2 id="randomRecipeTitle">Feel coky today, try random recipe!</h2>
        <button
          className="randomRecipeBtn"
          onClick={() => randomRecipe(items)}
          // onClick={() => console.log(items)}
        >
          Go crazy
        </button>
      </div>
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
      />
    </div>
  )
}
