import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios, { domain } from '../axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { userId } from '../redux/slices/users'
import { Box, Button, Modal, Typography } from '@mui/material'
import { style } from './Header'
import { isDeleted, setRecipe } from '../redux/slices/recipes'

export function FullRecipe() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.recipes)
  const isDelete = useSelector(isDeleted)
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const userInfo = useSelector(userId)
  const [isEdit, setIsEdit] = useState(false)

  const getOneRecipe = async (id) => {
    const { data } = await axios.get(`/recipes/${id}`).catch((err) => {
      alert('Error while loading recipe')
      console.warn(err)
    })
    dispatch(setRecipe(data))
  }

  const fetchDeleteRecipe = async (id) => {
    await axios.delete(`/recipes/${id}`).catch((err) => {
      alert('Error while deleting recipe')
      console.warn(err)
    })
    dispatch(setRecipe())
    setOpen(false)
  }

  const showState = () => {
    console.log(isDelete)
  }

  useEffect(() => {
    getOneRecipe(id)
  }, [])

  if (!isDelete) {
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
          {userInfo === items.author ? (
            <EditOutlinedIcon onClick={() => setIsEdit(true)} />
          ) : null}
          {userInfo === items.author ? (
            <DeleteForeverIcon onClick={() => setOpen(true)} />
          ) : null}
          <div id="Title">{items.title}</div>
          <img
            src={`${domain}/${items.recipeImage}`}
            id="img"
          ></img>
          <div id="Description">{items.description}</div>
          <div id="Ingredients">
            {items.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </div>
          <div id="Author">{items.author?.userName}</div>
          <div id="CreatedAt">{items.createdAt}</div>
          <div id="Views Count">{items.viewsCount}</div>
          <div id="Likes Count">{items.likesCount}</div>
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
