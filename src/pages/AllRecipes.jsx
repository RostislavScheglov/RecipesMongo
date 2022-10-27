import axios, { domain } from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthUser } from '../redux/slices/users'

export function AllRecipes() {
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)
  const isAuth = useSelector(isAuthUser)

  const fetchAllRecipes = async () => {
    const { data } = await axios.get('/recipes')
    setItem(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllRecipes()
  }, [])

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
              src={`${domain}/${item.recipeImage}`}
              id="img"
            ></img>
            <Link
              to={`/recipes/${item._id}`}
              id="Title"
            >
              {item.title}
            </Link>
            {isAuth ? <button>Add to fav</button> : null}
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}
