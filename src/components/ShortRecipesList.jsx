import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'
import stockImg from '../styles/assets/recipeImgPlaceholder.png'
import { RecipeAuthorInfo } from './RecipeAuthorInfo'
import { ErrorsList } from './ErrorsList'
import '../styles/componentsStyles/ShortRecipesList.css'

export function ShortRecipesList(props) {
  const isAllRecipes = props.isAllRecipes
  const checker = (el) => el !== undefined && el !== null && el !== ''

  if (props.isLoading) {
    return (
      <div className="noRecipesContainer">
        <ErrorsList
          err={props.err}
          isLoading={props.isLoading}
        />
        <h2>Loading...</h2>
      </div>
    )
  }
  if (props.items.length === 0) {
    return (
      <div className="noRecipesContainer">
        <ErrorsList
          err={props.err}
          isLoading={props.isLoading}
        />
        <h2>No recipes yet</h2>
      </div>
    )
  }

  return (
    <>
      <ErrorsList
        err={props.err}
        isLoading={props.isLoading}
      />
      <div className={isAllRecipes ? 'recipesPreviewFeed' : 'recipesPreview'}>
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
                  className="recipeImg"
                  src={item.recipeImage}
                  alt="img"
                ></img>
              ) : (
                <img
                  src={stockImg}
                  className="recipeImg"
                  alt="img"
                ></img>
              )}

              <div className="textContainer">
                <p id="title"> {item.title}</p>
                <p id="description">{item.description}</p>
                <RecipeAuthorInfo
                  isLoading={props.isLoading}
                  fileds={item}
                />
              </div>
            </Link>
            <LikeBtn
              likedBy={item.likedBy}
              id={item._id}
            />
          </div>
        ))}
      </div>
    </>
  )
}
