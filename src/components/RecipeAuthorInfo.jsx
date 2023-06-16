import { NavLink } from 'react-router-dom'
import likesCountIcon from '../styles/assets/likesCountIcon.svg'
import viewsCountIcon from '../styles/assets/viewsCountIcon.svg'
import { domain } from '../axios'

const checker = (el) =>
  el !== undefined && el !== null && el !== '' && el.length > 0

export function RecipeAuthorInfo(props) {
  const dateFormat = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10)
    return formattedDate
  }
  if (props.isLoading) {
    return (
      <div className="noUserInfo">
        {/* <ErrorsList err={props.err} /> */}
        <h2>Loading...</h2>
      </div>
    )
  }
  return (
    <div id="recipeStatsAuthorInfo">
      <NavLink
        className="recipeStatsLink"
        to={`/recipes/author/${props.fileds.author._id}`}
      >
        <img
          src={`${domain}${props.fileds.author.userImage}`}
          className="userAvatar"
          alt="Avatar"
        ></img>
        <div className="userInfoTextContainer">
          <span className="userName">{props.fileds.author.userName}</span>
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
          <span>{props.fileds.viewsCount}</span>
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
