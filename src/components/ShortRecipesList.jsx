import { domain } from '../axios'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../components/LikeBtn'
import stockImg from '../styles/assets/stockRecipe.png'
import { RecipeAuthorInfo } from './RecipeAuthorInfo'

export function ShortRecipesList(props) {
  if (props.isLoading) {
    return <>Loading...</>
  }
  const styles = props.styles
  const checker = (el) => el !== undefined && el !== null && el !== ''

  return (
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
              <p id={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium beatae culpa nesciunt assumenda, quae
                adipisci ut veritatis quas debitis placeat, suscipit na Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                praesentium beatae culpa nesciunt assumenda, quae adipisci ut
                veritatis quas debitis placeat, suscipit na Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Aspernatur praesentium
                beatae culpa nesciunt assumenda, quae adipisci ut veritatis quas
                debitis placeat, suscipit na
              </p>
              <RecipeAuthorInfo fileds={item} />
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
