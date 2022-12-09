import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios, { domain } from '../axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { Box, Button, Modal, Typography } from '@mui/material'
import { style } from './Header'

//Make checkBox near ingredient (to see what we have)

export function FullRecipe() {
  const { id } = useParams()
  const userInfo = useSelector(userId)

  const [fileds, setFields] = useState([])
  const [isDelete, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const getOneRecipe = async (id) => {
    console.log(id)
    const data = await axios.get(`/recipes/${id}`)
    console.log(data)
    setFields(data.data)
  }

  const fetchDeleteRecipe = async (id) => {
    await axios.delete(`/recipes/${id}`).catch((err) => {
      alert('Error while deleting recipe')
      console.warn(err)
    })
    setOpen(false)
    setIsDeleted(true)
  }

  useEffect(() => {
    getOneRecipe(id)
  }, [])

  //Redux
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
    <div>
      <div>
        <div>
          {userInfo === fileds.author ? (
            <EditOutlinedIcon onClick={() => setIsEdit(true)} />
          ) : null}
          {userInfo === fileds.author ? (
            <DeleteForeverIcon onClick={() => setOpen(true)} />
          ) : null}
          <div id="Title">{fileds.title}</div>
          <img
            src={`${domain}${fileds.recipeImage}`}
            id="img"
            alt="Img"
          ></img>
          <div id="Description">{fileds.description}</div>
          <div id="Ingredients">
            {fileds.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </div>
          <div id="Author">{fileds.author?.userName}</div>
          <div id="CreatedAt">{fileds.createdAt}</div>
          <div id="Views Count">{fileds.viewsCount}</div>
          <div id="Likes Count">{fileds.likesCount}</div>
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
