import axios, { domain } from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { errorsSetter } from '../components/ErrorsList'
import { useParams } from 'react-router-dom'
import styles from '../styles/shortRecipeList.module.css'

export function AuthorRecipes() {
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [err, setErr] = useState([])
  const { id } = useParams()

  const fetchAuthorRecipes = async (setRecipes, setLoading, getAuthorInfo) => {
    try {
      const resolvedAthorInfo = await getAuthorInfo
      const { data } = await axios.get(`/recipes/author/${resolvedAthorInfo}`)
      setRecipes(data)
      setLoading(false)
    } catch (err) {
      errorsSetter(err, setErr)
    }
  }

  //Make custom hook for getting data from server (incapsulate useEffect)
  useEffect(() => {
    fetchAuthorRecipes(setItem, setLoading, id)
  }, [id])

  return (
    <div className="feedContainer">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div id="authorInfoContainer">
          <img
            src={`${domain}${items[0].author.userImage}`}
            className="userAvatar"
            alt="Avatar"
          ></img>
          <span className="authorName">{items[0].author.userName}</span>
        </div>
      )}

      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
        err={err}
      />
    </div>
  )
}
