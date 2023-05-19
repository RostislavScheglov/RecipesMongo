import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { ErrorsList } from '../components/ErrorsList'

import styles from '../styles/shortRecipeBigOne.module.css'
import { useNavigate } from 'react-router-dom'

export function AllRecipes() {
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])
  const navigate = useNavigate()

  //try catch
  const fetchAllRecipes = async () => {
    try {
      const { data } = await axios.get('/recipes/all')
      setItem(data)
      setLoading(false)
    } catch (err) {
      setErr(err)
    }
  }

  //rework with navigate or link
  const randomRecipe = (allitems) => {
    const allIds = allitems.map((item) => item._id)
    const randomId = allIds[Math.floor(Math.random() * items.length)]
    navigate(`/recipes/${randomId}`)
  }

  //Make custom hook for getting data from server (incapsulate useEffect)
  useEffect(() => {
    fetchAllRecipes()
  }, [])

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
        err={err}
      />
    </div>
  )
}
