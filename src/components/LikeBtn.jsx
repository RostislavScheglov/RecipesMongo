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
        <div className="svgContainer">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => fetchLike(props.id)}
          >
            <path
              fill="#000000"
              fillRule="evenodd"
              d="M9.689 1.343a4.604 4.604 0 014.97.979 4.482 4.482 0 010 6.4l-6.132 6.061a.75.75 0 01-1.054 0L1.34 8.723A4.5 4.5 0 010 5.523a4.5 4.5 0 011.34-3.201A4.589 4.589 0 014.566 1c1.208 0 2.369.475 3.226 1.322L8 2.527l.208-.205a4.57 4.57 0 011.48-.979zm3.916 2.045a3.104 3.104 0 00-4.342 0l-.736.727a.75.75 0 01-1.054 0l-.736-.726a3.089 3.089 0 00-2.17-.889c-.817 0-1.598.32-2.172.889A3 3 0 001.5 5.522a3 3 0 00.895 2.134L8 13.196l5.605-5.54c.284-.281.51-.614.663-.98a2.981 2.981 0 00-.663-3.288z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : null}

      {isFavourite && isAuth ? (
        <div className="svgContainer">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => fetchDisLike(props.id)}
          >
            <path
              fill="#000000"
              d="M11.434 1a4.604 4.604 0 00-3.226 1.322L8 2.527l-.208-.205A4.589 4.589 0 004.566 1 4.589 4.589 0 001.34 2.322 4.5 4.5 0 000 5.522a4.5 4.5 0 001.34 3.2l6.133 6.061a.75.75 0 001.054 0l6.132-6.06a4.52 4.52 0 00.992-1.467 4.482 4.482 0 00-.992-4.934A4.604 4.604 0 0011.433 1z"
            />
          </svg>
        </div>
      ) : null}
    </>
  )
}
