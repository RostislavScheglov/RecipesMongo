import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios, { domain } from '../axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { Box, Button, Modal, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { ErrorsList } from '../components/ErrorsList'
import stockImg from '../styles/assets/stockRecipe.png'
import { checker } from './EditRecipe'
import { ShortRecipesList } from '../components/ShortRecipesList'
import { fetchAuthorRecipes } from './AuthorRecipes'
import EditIcon from '../styles/assets/Edit.svg'
import DeleteIcon from '../styles/assets/Delete.svg'

import styles from '../styles/shortRecipeList.module.css'
import { RecipeAuthorInfo } from '../components/RecipeAuthorInfo'

//Make checkBox near ingredient (to see what we have)

export function FullRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [err, setErr] = useState()
  const [fileds, setFields] = useState([])
  const [items, setItem] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isDelete, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const imgId = fileds?.recipeImage
  // const authorInfo = fileds.author

  const getOneRecipe = async (id, setRecipeState) => {
    const data = await axios.get(`/recipes/${id}`).catch()
    setRecipeState(data.data)
    return data.data
    // fetchAuthorRecipes(setItem, setLoading, data.data.author)
  }

  const fetch3AuthorRecipes = async (setRecipes, setLoading, getAuthorInfo) => {
    try {
      const resolvedAthorInfo = await getAuthorInfo
      console.log(resolvedAthorInfo)
      const { data } = await axios.get(
        `/recipes/author/${resolvedAthorInfo.author?._id}`
      )
      setRecipes(data.slice(0, 3))
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  //Add remove recipe img after deleting recipe
  const fetchDeleteRecipe = async (id) => {
    axios
      .delete(`/recipes/${id}/${userInfo}`)
      .then(() => {
        axios.delete(`recipes/img/${imgId}`)
      })
      .then(() => setIsDeleted(true))
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        setErr(x)
      })
      .finally(setOpen(false))
  }

  useEffect(() => {
    fetch3AuthorRecipes(setItem, setLoading, getOneRecipe(id, setFields))
  }, [id])

  //Refactor
  if (isDelete) {
    return (
      <Navigate
        to="/recipes/myrecipes"
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
  return (
    <>
      <div className="fullRecipeContainer">
        <div className="mainRecipeInfoContainer">
          <ErrorsList
            err={err}
            // isErr={isErr}
          />
          {/* <div id="fullRecipeImgContainer"> */}
          <RecipeAuthorInfo fileds={fileds} />

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
          <div className="recipeActionsContainer">
            {/* {userInfo === fileds.author ? ( */}

            {/* <EditOutlinedIcon onClick={() => setIsEdit(true)} /> */}
            {/* ) : null} */}
            {/* {userInfo === fileds.author ? ( */}
            <button
              className="deleteRecipeBtn"
              onClick={() => setOpen(true)}
            >
              {/* <div className="test"> */}
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
            {/* ) : null} */}
          </div>
          {/* <p>Author</p>
          <div id="Author">{fileds.author}</div> */}
          {/* <div id="CreatedAt">{fileds.createdAt}</div> */}
        </div>
        <ul id="Ingredients">
          <p>Ingredients</p>
          {fileds.ingredients?.map((ingredient, index) => (
            <li
              className="ingredient"
              key={index}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <p>More of {fileds?.author?.userName}:</p>
      <ShortRecipesList
        items={items}
        isLoading={isLoading}
        styles={styles}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box id="modalWindow">
          <Typography>
            <h2>Are u sure you want to DELETE recipe?</h2>
          </Typography>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => fetchDeleteRecipe(id)}>Yes</Button>
        </Box>
      </Modal>
    </>
  )
}
