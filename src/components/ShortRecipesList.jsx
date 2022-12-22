import { domain } from '../axios'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'

export function ShortRecipesList(props) {
  if (props.isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="recipesContainer">
      <div className="recipesPreview">
        {props.items.map((item) => (
          <div
            id="recipe"
            key={item._id}
          >
            <br></br>
            {item.recipeImage ? (
              <img
                src={`${domain}${item.recipeImage}`}
                id="recipeImg"
                alt="Img"
              ></img>
            ) : null}
            <Link
              to={`/recipes/${item._id}`}
              id="Title"
            >
              {item.title}
            </Link>

            <LikeBtn
              likedBy={item.likedBy}
              id={item._id}
            />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}
