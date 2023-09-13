import { NavLink } from 'react-router-dom'
import likesCountIcon from '../styles/assets/svgs/likesCountIcon.svg'
import viewsCountIcon from '../styles/assets/svgs/viewsCountIcon.svg'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'
import '../styles/componentsStyles/RecipeAuthorInfo.css'

export function RecipeAuthorInfo(props) {
  const dateFormat = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10)
    return formattedDate
  }

  if (props.isLoading) {
    return (
      <div className="noUserInfo">
        <h2>Loading...</h2>
      </div>
    )
  }
  const authorInfo = props.fileds.author
  return (
    <div id="recipeStatsAuthorInfo">
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
          <span id="recipeDateCreation">
            Created {dateFormat(props.fileds.createdAt)}
          </span>
        </div>
      </NavLink>
      <div className="statsContainer">
        <div id="viewsCountContainer">
          <img
            id="viewsCount"
            src={viewsCountIcon}
            alt="viewssIcon"
          />
          <span>{props.fileds.viewsCount.length}</span>
        </div>
        <div id="likesCountContainer">
          <img
            id="likesCount"
            src={likesCountIcon}
            alt="likesIcon"
          />
          <span>{props.fileds.likedBy.length}</span>
        </div>
      </div>
    </div>
  )
}
