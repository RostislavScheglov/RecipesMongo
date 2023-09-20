import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../axios'
import { useSelector } from 'react-redux'
import { isAuthUser, userId } from '../redux/slices/users'
import { Box, Modal } from '@mui/material'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import stockImg from '../styles/assets/recipeImgPlaceholder.png'
import { checker } from './EditRecipe'
import { ShortRecipesList } from '../components/ShortRecipesList'
import EditIcon from '../styles/assets/svgs/Edit.svg'
import DeleteIcon from '../styles/assets/svgs/Delete.svg'
import { RecipeAuthorInfo } from '../components/RecipeAuthorInfo'
import '../styles/pagesStyles/FullRecipe.css'
import { LikeBtn } from '../components/LikeBtn'

export function FullRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [err, setErr] = useState([])
  const [fileds, setFields] = useState([])
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isDelete, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const isAuth = useSelector(isAuthUser)

  const getOneRecipe = async (id, setRecipeState) => {
    try {
      const data = await axios.get(`/recipes/${id}`)
      setRecipeState(data.data)
      setLoading(false)
      return data.data
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const fetch3AuthorRecipes = async (setRecipes, setLoading, getAuthorInfo) => {
    try {
      const resolvedAthorInfo = await getAuthorInfo
      const { data } = await axios.get(
        `/recipes?filter=author&id=${resolvedAthorInfo.author._id}`
      )
      setRecipes(data.slice(0, 3))
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const fetchDeleteRecipe = async (id) => {
    try {
      await axios.delete(`/recipes?id=${id}&userId=${userInfo}`)
      setIsDeleted(true)
      setOpen(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  useEffect(() => {
    fetch3AuthorRecipes(setItem, setLoading, getOneRecipe(id, setFields))
  }, [id])

  if (isDelete) {
    return (
      <Navigate
        to="/"
        replace={true}
      />
    )
  }

  if (isEdit) {
    return (
      <Navigate
        to={`/recipes/edit/${id}`}
        replace={true}
      />
    )
  }
  if (!isAuth) {
    return (
      <Navigate
        to={`/user/login`}
        replace={true}
      />
    )
  }
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="fullRecipeContainer">
            <div className="mainRecipeInfoContainer">
              <ErrorsList
                err={err}
                isLoading={isLoading}
              />
              <div className="recipeAuthorInfoContainer">
                <RecipeAuthorInfo
                  isLoading={isLoading}
                  fileds={fileds}
                />
              </div>
              <div className="title">{fileds.title}</div>
              {checker(fileds.recipeImage) ? (
                <img
                  src={`${fileds.recipeImage}`}
                  className="fullRecipeImg"
                  alt="Img"
                ></img>
              ) : (
                <img
                  className="fullRecipeImg"
                  src={stockImg}
                  alt="StockImg"
                ></img>
              )}
              <LikeBtn
                id={id}
                likedBy={fileds.likedBy}
                isFullRecipe={true}
              />
              <pre className="description">{fileds.description}</pre>
              <pre className="directions">
                <p className="directionsTittle">Directions:</p>
                {fileds.directions}
              </pre>
              <ul className="ingredients">
                <p className="ingredientsTittle">Ingredients:</p>
                {fileds.ingredients.map((ingredient, index) => (
                  <li
                    className="ingredient"
                    key={index}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              {userInfo === fileds.author._id ? (
                <div className="recipeActionsContainer">
                  <button
                    className="deleteRecipeBtn"
                    onClick={() => setOpen(true)}
                  >
                    <img
                      className="svgIcon"
                      src={DeleteIcon}
                      alt="Delete Icon"
                    />
                    Delete
                  </button>
                  <button
                    className="editRecipeBtn"
                    onClick={() => setIsEdit(true)}
                  >
                    <img
                      className="svgIcon"
                      src={EditIcon}
                      alt="Edit Icon"
                    />
                    Edit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <p>More of {fileds.author.userName}:</p>
        </>
      )}

      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        err={err}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="modalWindow">
          <span className="modalTitle">
            Are u sure you want to DELETE recipe?
          </span>
          <div className="btnContainer">
            <button
              className="modalCancelBtn"
              onClick={() => setOpen(false)}
            >
              No
            </button>
            <button
              className="modalSubmitBtn"
              onClick={() => fetchDeleteRecipe(id)}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
