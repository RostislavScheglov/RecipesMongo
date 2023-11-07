import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'
import { useNavigate } from 'react-router-dom'
import '../styles/pagesStyles/AllRecipes.css'

export function AllRecipes() {
  const [allRecipes, setAllRecipes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])
  const navigate = useNavigate()

  const fetchAllRecipes = async () => {
    try {
      const { data } = await axios.get('/recipes?filter=all')
      setAllRecipes(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const randomRecipe = (allRecipes) => {
    const allIds = allRecipes.map((item) => item._id)
    const randomId = allIds[Math.floor(Math.random() * allRecipes.length)]
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
          onClick={() => randomRecipe(allRecipes)}
        >
          Go crazy
        </button>
      </div>
      <ShortRecipesList
        recipes={allRecipes}
        isLoading={isLoading}
        isAllRecipes={true}
        err={err}
      />
    </div>
  )
}
