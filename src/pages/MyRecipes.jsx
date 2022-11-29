import axios, { domain } from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'

export function MyRecipes() {
  const isAuth = useSelector(isAuthUser)
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)

  const fetchMyRecipes = async () => {
    const { data } = await axios.get('/recipes/myrecipes')
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
    <div>
      <div>
        {items.map((item) => (
          <div
            id="recipe"
            key={item._id}
          >
            <br></br>
            <img
              src={`${domain}${item.recipeImage}`}
              id="img"
            ></img>
            <Link
              to={`/recipes/${item._id}`}
              id="Title"
            >
              {item.title}
            </Link>
            <button>Delete recipe</button>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}
