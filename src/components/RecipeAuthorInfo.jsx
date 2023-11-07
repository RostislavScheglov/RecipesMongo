import { NavLink } from 'react-router-dom'
import likesCountIcon from '../styles/assets/svgs/likesCountIcon.svg'
import viewsCountIcon from '../styles/assets/svgs/viewsCountIcon.svg'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'
import '../styles/componentsStyles/RecipeAuthorInfo.css'

export function RecipeAuthorInfo({ recipe, isLoading }) {
  const dateFormat = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10)
    return formattedDate
  }

  if (isLoading) {
    return (
      <div className="noUserInfo">
        <h2>Loading...</h2>
      </div>
    )
  }
  const authorInfo = recipe.author
  return (
    <div className="recipeStatsAuthorInfo">
      <NavLink
        className="recipeStatsLink"
        to={`/recipes/author/${authorInfo._id}`}
      >
        {authorInfo.userImage ? (
          <img
            src={`${authorInfo.userImage}`}
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

        <div className="userInfoTextContainer">
          <span className="userName">{authorInfo.userName}</span>
          <span className="recipeDateCreation">
            Created {dateFormat(recipe.createdAt)}
          </span>
        </div>
      </NavLink>
      <div className="statsContainer">
        <div className="viewsCountContainer">
          <img
            className="viewsCount"
            src={viewsCountIcon}
            alt="viewssIcon"
          />
          <span>{recipe.viewsCount.length}</span>
        </div>
        <div className="likesCountContainer">
          <img
            className="likesCount"
            src={likesCountIcon}
            alt="likesIcon"
          />
          <span>{recipe.likedBy.length}</span>
        </div>
      </div>
    </div>
  )
}
