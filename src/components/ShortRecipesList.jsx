import { domain } from '../axios'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'

export function ShortRecipesList(props) {
  if (props.isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="recipesPreview">
      {props.items.map((item) => (
        <div
          className="recipe"
          key={item._id}
        >
          <Link
            className="linkContainer"
            to={`/recipes/${item._id}`}
          >
            <div className="shortRecipeImgContainer">
              {item.recipeImage ? (
                <img
                  src={`${domain}${item.recipeImage}`}
                  className="recipeImg"
                  alt="Img"
                ></img>
              ) : null}
            </div>
            <div className="textContainer">
              <p id="Title"> {item.title}</p>
              <p id="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium beatae culpa nesciunt assumenda, quae
                adipisci ut veritatis quas debitis placeat, suscipit na
              </p>
            </div>
          </Link>
          <LikeBtn
            likedBy={item.likedBy}
            id={item._id}
          />
        </div>
      ))}
    </div>
  )
}
