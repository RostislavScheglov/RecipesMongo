import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios, { domain } from '../axios'
import { useSelector } from 'react-redux'
import { isAuthUser, userId } from '../redux/slices/users'
import { Box, Modal } from '@mui/material'
import { ErrorsList, errorsSetter } from '../components/ErrorsList'
import stockImg from '../styles/assets/stockRecipe.png'
import { checker } from './EditRecipe'
import { ShortRecipesList } from '../components/ShortRecipesList'
import EditIcon from '../styles/assets/Edit.svg'
import DeleteIcon from '../styles/assets/Delete.svg'

import styles from '../styles/shortRecipeList.module.css'
import { RecipeAuthorInfo } from '../components/RecipeAuthorInfo'

//Make checkBox near ingredient (to see what we have)

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
  const imgId = fileds?.recipeImage

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
        `/recipes/author/${resolvedAthorInfo.author._id}`
      )
      setRecipes(data.slice(0, 3))
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorsSetter(err, setErr)
    }
  }

  const fetchDeleteRecipe = async (id) => {
    axios
      .delete(`/recipes/${id}/${userInfo}`)
      .then(() => {
        axios.delete(`recipes/img/${imgId}`)
      })
      .then(() => setIsDeleted(true))
      .catch((err) => {
        setLoading(false)
        errorsSetter(err, setErr)
      })
      .finally(setOpen(false))
  }

  useEffect(() => {
    fetch3AuthorRecipes(setItem, setLoading, getOneRecipe(id, setFields))
  }, [id])

  if (isDelete) {
    return (
      <Navigate
        to="/recipes"
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
        to={`/auth/login`}
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
              <div id="Title">{fileds.title}</div>
              {checker(fileds.recipeImage) ? (
                <img
                  src={`${domain}${fileds.recipeImage}`}
                  className="uploadedImg"
                  alt="Img"
                ></img>
              ) : (
                <img
                  className="uploadedImg"
                  src={stockImg}
                  alt="StockImg"
                ></img>
              )}
              <div id="Description">{fileds.description}</div>
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
            <ul id="Ingredients">
              <p id="ingredientsTittle">Ingredients:</p>
              {fileds.ingredients.map((ingredient, index) => (
                <li
                  className="ingredient"
                  key={index}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <p>More of {fileds.author.userName}:</p>
        </>
      )}

      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
        err={err}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box id="modalWindow">
          <span className="modalTitle">
            Are u sure you want to DELETE recipe?
          </span>
          <div id="btnContainer">
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
