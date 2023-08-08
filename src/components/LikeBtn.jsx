import axios from '../axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isAuthUser, userId } from '../redux/slices/users'
import likeBtnIcon from '../styles/assets/svgs/likeBtnIcon.svg'
import dislikeBtnIcon from '../styles/assets/svgs/dislikeBtnIcon.svg'

export const LikeBtn = (props) => {
  const isAuth = useSelector(isAuthUser)
  const user = useSelector(userId)
  const [isFavourite, setIsFavourite] = useState(props.likedBy.includes(user))

  const fetchLike = async (id) => {
    await axios
      .patch(`/recipes/like?id=${id}&userId=${user}&liked=${true}`)
      .then(setIsFavourite(true))
      .catch((err) => console.log(err))
  }

  const fetchDisLike = async (id) => {
    await axios
      .patch(`/recipes/like?id=${id}&userId=${user}&liked=${false}`)
      .then(setIsFavourite(false))
      .catch((err) => console.log(err))
  }

  return (
    <>
      {!isFavourite && isAuth ? (
        <div className="svgContainer">
          <img
            src={likeBtnIcon}
            onClick={() => fetchLike(props.id)}
            alt="like Btn icon"
          />
        </div>
      ) : null}

      {isFavourite && isAuth ? (
        <div className="svgContainer">
          <img
            src={dislikeBtnIcon}
            onClick={() => fetchDisLike(props.id)}
            alt="disLike btn Icon"
          />
        </div>
      ) : null}
    </>
  )
}
