import axios from '../axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isAuthUser, userId } from '../redux/slices/users'

export const LikeBtn = (props) => {
  const isAuth = useSelector(isAuthUser)
  const user = useSelector(userId)
  const [isFavourite, setIsFavourite] = useState(props.likedBy.includes(user))

  const fetchLike = async (id) => {
    const userObj = { userId: user, liked: true }
    await axios
      // .patch(`/recipes/${id}`, userObj)
      .patch(`/recipes/likeDislike/${id}`, userObj)
      .then(setIsFavourite(true))
      .catch((err) => console.log(err))
  }

  const fetchDisLike = async (id) => {
    const userObj = { userId: user, liked: false }
    await axios
      .patch(`/recipes/likeDislike/${id}`, userObj)
      .then(setIsFavourite(false))
      .catch((err) => console.log(err))
  }

  return (
    <>
      {!isFavourite && isAuth ? (
        <button onClick={() => fetchLike(props.id)}>Add to Fav</button>
      ) : null}

      {isFavourite && isAuth ? (
        <button onClick={() => fetchDisLike(props.id)}>Delete from Fav</button>
      ) : null}
    </>
  )
}
