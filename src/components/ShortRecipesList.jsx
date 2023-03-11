import { domain } from '../axios'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'
import stockImg from '../styles/assets/stockRecipe.png'

export function ShortRecipesList(props) {
  if (props.isLoading) {
    return <>Loading...</>
  }
  const checker = (el) => el !== undefined && el !== null && el !== ''
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
            {checker(item.recipeImage) ? (
              <img
                src={`${domain}${item.recipeImage}`}
                className="shortRecipeImg"
                alt="Img"
              ></img>
            ) : (
              <img
                className="shortRecipeImg"
                src={stockImg}
                alt="StockImg"
              ></img>
            )}

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
