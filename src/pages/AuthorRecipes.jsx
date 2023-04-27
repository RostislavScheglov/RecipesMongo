import axios from '../axios'
import { useEffect, useState } from 'react'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { ErrorsList } from '../components/ErrorsList'
import { useParams } from 'react-router-dom'
import styles from '../styles/shortRecipeList.module.css'

export const fetchAuthorRecipes = async (
  setRecipes,
  setLoading,
  getAuthorInfo
) => {
  // try {
  const resolvedAthorInfo = await getAuthorInfo
  console.log(resolvedAthorInfo)
  const { data } = await axios.get(`/recipes/author/${resolvedAthorInfo}`)
  setRecipes(data)
  setLoading(false)
  // } catch (err) {
  //   console.log(err)
  // }
}

export function AuthorRecipes() {
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams()
  //try catch

  //Make custom hook for getting data from server (incapsulate useEffect)
  useEffect(() => {
    fetchAuthorRecipes(setItem, setLoading, id)
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="feedContainer">
      <div id="authorInfoContainer">
        <span className="authorName">{items[0].author.userName}</span>
        <span>{items[0].author.userEmail}</span>
      </div>
      {/* <ErrorsList err={err} /> */}
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
      />
    </div>
  )
}
