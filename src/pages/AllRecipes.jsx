import axios, { domain } from '../axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthUser, userId } from '../redux/slices/users'

export function AllRecipes() {
  const [items, setItem] = useState()
  const [isLoading, setLoading] = useState(true)
  // const [isFavourite, setIsFavourite] = useState()
  const isAuth = useSelector(isAuthUser)
  const user = useSelector(userId)

  const fetchAllRecipes = async () => {
    const { data } = await axios.get('/recipes')
    setItem(data)
    setLoading(false)
  }

  const fetchLike = async (id, setState) => {
    const userObj = { userId: user }
    await axios
      .patch(`/recipes/${id}`, userObj)
      .catch((err) => console.log(err))
    setState(true)
  }

  const fetchDisLike = async (id, setState) => {
    const userObj = { userId: user }
    await axios.patch(`/${id}`, userObj).catch((err) => console.log(err))
    setState(false)
  }

  useEffect(() => {
    fetchAllRecipes()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  const LikeBtn = (props) => {
    const [isFavourite, setIsFavourite] = useState()

    if (!props.likedBy.includes(user) && !isFavourite) {
      return isAuth ? (
        <button onClick={() => fetchLike(props.id, setIsFavourite)}>
          Add to Fav
        </button>
      ) : null
    }
    return isAuth ? (
      <button onClick={() => fetchDisLike(props.id, setIsFavourite)}>
        Delete from Fav
      </button>
    ) : null
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

            <LikeBtn
              likedBy={item.likedBy}
              id={item._id}
            />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}
