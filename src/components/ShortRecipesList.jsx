import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'
import stockImg from '../styles/assets/recipeImgPlaceholder.png'
import { RecipeAuthorInfo } from './RecipeAuthorInfo'
import { ErrorsList } from './ErrorsList'
import '../styles/componentsStyles/ShortRecipesList.css'

export function ShortRecipesList({ recipes, isAllRecipes, isLoading, err }) {
  const checker = (el) => el !== undefined && el !== null && el !== ''

  if (isLoading) {
    return (
      <div className="noRecipesContainer">
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <h2>Loading...</h2>
      </div>
    )
  }
  if (recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <ErrorsList
          err={err}
          isLoading={isLoading}
        />
        <h2>No recipes yet</h2>
      </div>
    )
  }

  return (
    <>
      <ErrorsList
        err={err}
        isLoading={isLoading}
      />
      <div className={isAllRecipes ? 'recipesPreviewFeed' : 'recipesPreview'}>
        {recipes.map((recipe) => (
          <div
            className="recipe"
            key={recipe._id}
          >
            <Link
              className="linkContainer"
              to={`/recipes/${recipe._id}`}
            >
              {checker(recipe.recipeImage) ? (
                <img
                  className="recipeImg"
                  src={recipe.recipeImage}
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
                <p id="title"> {recipe.title}</p>
                <p id="description">{recipe.description}...</p>
                <RecipeAuthorInfo
                  isLoading={isLoading}
                  recipe={recipe}
                />
              </div>
            </Link>
            <LikeBtn
              likedBy={recipe.likedBy}
              id={recipe._id}
            />
          </div>
        ))}
      </div>
    </>
  )
}
