import { NavLink } from 'react-router-dom'
import likesCountIcon from '../styles/assets/likesCountIcon.svg'
import viewsCountIcon from '../styles/assets/viewsCountIcon.svg'
import { domain } from '../axios'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'
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
            src={`${domain}${authorInfo.userImage}`}
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
            src={viewsCountIcon}
            alt="viewssIcon"
          />
          <span>{props.fileds.viewsCount.length}</span>
        </div>
        <div id="likesCountContainer">
          <img
            src={likesCountIcon}
            alt="likesIcon"
          />
          <span>{props.fileds.likedBy.length}</span>
        </div>
      </div>
    </div>
  )
}
