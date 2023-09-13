import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'
import { useParams } from 'react-router-dom'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'
import '../styles/pagesStyles/AuthorRecipes.css'

export function AuthorRecipes() {
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])
  const { id } = useParams()

  const fetchAuthorRecipes = async (setRecipes, setLoading, getAuthorInfo) => {
    try {
      const resolvedAuthorId = await getAuthorInfo
      const { data } = await axios.get(
        `/recipes?filter=author&id=${resolvedAuthorId}`
      )
      setRecipes(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  useEffect(() => {
    fetchAuthorRecipes(setItem, setLoading, id)
  }, [id])

  return (
    <div className="feedContainer">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="authorInfoContainer">
          {items[0].author.userImage ? (
            <img
              src={`${items[0].author.userImage}`}
              className="userAvatar"
              alt="Avatar"
            ></img>
          ) : (
            <img
              src={userAvatarPlaceholder}
              className="userAvatar"
              alt="Avatar"
            ></img>
          )}
          <span className="authorName">{items[0].author.userName}</span>
        </div>
      )}

      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        err={err}
      />
    </div>
  )
}
