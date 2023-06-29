import { domain } from '../axios'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'
import stockImg from '../styles/assets/stockRecipe.png'
import { RecipeAuthorInfo } from './RecipeAuthorInfo'
import { ErrorsList } from './ErrorsList'

export function ShortRecipesList(props) {
  const styles = props.styles
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
      <div className={styles.recipesPreview}>
        {props.items.map((item) => (
          <div
            className={styles.recipe}
            key={item._id}
          >
            <Link
              className={styles.linkContainer}
              to={`/recipes/${item._id}`}
            >
              {checker(item.recipeImage) ? (
                <img
                  src={`${domain}${item.recipeImage}`}
                  className={styles.shortRecipeImg}
                  alt="Img"
                ></img>
              ) : (
                <img
                  className={styles.shortRecipeImg}
                  src={stockImg}
                  alt="StockImg"
                ></img>
              )}

              <div className={styles.textContainer}>
                <p id={styles.title}> {item.title}</p>
                <p id={styles.description}>{item.description}</p>
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
