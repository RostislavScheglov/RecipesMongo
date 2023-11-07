import axios from '../axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isAuthUser, userId } from '../redux/slices/users'
import likeBtnIcon from '../styles/assets/svgs/likeBtnIcon.svg'
import dislikeBtnIcon from '../styles/assets/svgs/dislikeBtnIcon.svg'
import '../styles/componentsStyles/LikeBtn.css'

export const LikeBtn = ({ likedBy, id, isFullRecipe }) => {
  const isAuth = useSelector(isAuthUser)
  const user = useSelector(userId)
  const [isFavourite, setIsFavourite] = useState(likedBy.includes(user))

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

  const likeBtnFullRecipeStyles = {
    svgContainer: {
      gridRowStart: 1,
      gridColumnStart: 2,
      height: 'fit-content',
      width: 'fit-content',
      position: 'static',
      padding: '0',
      margin: '0 0 0 1em',
      alignSelf: 'end',
      justifySelf: 'end',
      backgroundColor: 'transparent',
      color: '#B78DE7',
      borderBottom: '1px solid #B78DE7',
      borderRadius: '0px',
    },
    noneStyle: {
      display: 'none',
    },
  }

  return (
    <>
      {!isFavourite && isAuth ? (
        <div
          className="svgContainer"
          style={
            isFullRecipe ? { ...likeBtnFullRecipeStyles.svgContainer } : {}
          }
          onClick={() => fetchLike(id)}
        >
          <span
            style={isFullRecipe ? {} : { ...likeBtnFullRecipeStyles.noneStyle }}
          >
            Add to favourite
          </span>
          <img
            src={likeBtnIcon}
            className="likeBtnSvg"
            alt="like Btn icon"
            style={isFullRecipe ? { ...likeBtnFullRecipeStyles.noneStyle } : {}}
          />
        </div>
      ) : null}

      {isFavourite && isAuth ? (
        <div
          className="svgContainer"
          style={
            isFullRecipe ? { ...likeBtnFullRecipeStyles.svgContainer } : {}
          }
          onClick={() => fetchDisLike(id)}
        >
          <span
            style={isFullRecipe ? {} : { ...likeBtnFullRecipeStyles.noneStyle }}
          >
            Delete from favourite
          </span>
          <img
            src={dislikeBtnIcon}
            className="likeBtnSvg"
            alt="disLike btn Icon"
            style={isFullRecipe ? { ...likeBtnFullRecipeStyles.noneStyle } : {}}
          />
        </div>
      ) : null}
    </>
  )
}
