import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'
import { useNavigate } from 'react-router-dom'
import '../styles/pagesStyles/AllRecipes.css'

export function AllRecipes() {
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])
  const navigate = useNavigate()

  const fetchAllRecipes = async () => {
    try {
      const { data } = await axios.get('/recipes?filter=all')
      setItem(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const randomRecipe = (allitems) => {
    const allIds = allitems.map((item) => item._id)
    const randomId = allIds[Math.floor(Math.random() * items.length)]
    navigate(`/recipes/${randomId}`)
  }

  useEffect(() => {
    fetchAllRecipes()
  }, [])

  return (
    <div className="feedContainer">
      <div className="randomRecip">
        <h2 className="randomRecipeTitle">
          Feel coky today, try random recipe!
        </h2>
        <button
          className="randomRecipeBtn"
          onClick={() => randomRecipe(items)}
        >
          Go crazy
        </button>
      </div>
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        isAllRecipes={true}
        err={err}
      />
    </div>
  )
}
