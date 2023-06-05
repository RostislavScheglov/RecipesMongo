import { NavLink } from 'react-router-dom'
import likesCountIcon from '../styles/assets/likesCountIcon.svg'
import viewsCountIcon from '../styles/assets/viewsCountIcon.svg'
import { domain } from '../axios'

export function RecipeAuthorInfo(props) {
  // const styles = props.styles
  // const checker = (el) => el !== undefined && el !== null && el !== ''

  return (
    <div id="recipeStatsAuthorInfo">
      {/* <button onClick={() => console.log(props)}></button> */}
      <NavLink
        className="recipeStatsLink"
        to={`/recipes/author/${props.fileds?.author?._id}`}
      >
        {/* <button onClick={() => console.log(props?.fileds.author)}></button> */}
        <img
          src={`${domain}${props?.fileds.author?.userImage}`}
          className="userAvatar"
          alt="Avatar"
        ></img>
        <div className="userInfoTextContainer">
          <span>{props?.fileds.author?.userName}</span>
          {/* <span>{props?.fileds.author?.userEmail}</span> */}
          <span id="recipeDateCreation">
            Created {props?.fileds?.createdAt}
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
          <span>{props.fileds.likedBy?.length}</span>
        </div>
      </div>
    </div>
  )
}
