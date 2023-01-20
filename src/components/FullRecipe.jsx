import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios, { domain } from '../axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { Box, Button, Modal, Typography } from '@mui/material'
import { style } from './Header'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { ErrorsList } from './ErrorsList'

//Make checkBox near ingredient (to see what we have)

export function FullRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [err, setErr] = useState()
  const [fileds, setFields] = useState([])
  const [isDelete, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const getOneRecipe = async (id) => {
    const data = await axios.get(`/recipes/${id}`).catch()
    setFields(data.data)
  }
  //Add remove recipe img after deleting recipe
  const fetchDeleteRecipe = async (id) => {
    axios
      .delete(`/recipes/${id}/${userInfo}`)
      .then(() => {
        setIsDeleted(true)
      })
      .catch((err) => {
        setErr([err.response.data.message])
        console.log([err.response.data.message])
        // alert('Error while deleting recipe')
        console.warn(err)
      })
      .finally(setOpen(false))
  }

  useEffect(() => {
    getOneRecipe(id)
  }, [])

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
    <div className="fullRecipeContainer">
      <ErrorsList
        err={err}
        // isErr={isErr}
      />
      <div className="recipeActionsContainer">
        {/* {userInfo === fileds.author ? ( */}
        <EditOutlinedIcon onClick={() => setIsEdit(true)} />
        {/* ) : null} */}
        {/* {userInfo === fileds.author ? ( */}
        <DeleteForeverIcon onClick={() => setOpen(true)} />
        {/* ) : null} */}
      </div>
      <h3>Recipe title</h3>
      <div id="Title">{fileds.title}</div>
      <img
        src={`${domain}${fileds.recipeImage}`}
        id="img"
        alt="Img"
      ></img>
      <p>Description:</p>
      <div id="Description">{fileds.description}</div>
      <p>Ingredients</p>
      <div id="Ingredients">
        {fileds.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </div>
      {/* <p>Author</p>
          <div id="Author">{fileds.author}</div> */}
      {/* <div id="CreatedAt">{fileds.createdAt}</div> */}
      <div className="statsContainer">
        <div id="Views Count">
          <VisibilityOutlinedIcon />
          {fileds.viewsCount}
        </div>
        <div id="Likes Count">
          <FavoriteBorderOutlinedIcon />
          {fileds.likedBy?.length}
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography>
            <h2>Are u sure you want to DELETE recipe?</h2>
          </Typography>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => fetchDeleteRecipe(id)}>Yes</Button>
        </Box>
      </Modal>
    </div>
  )
}
