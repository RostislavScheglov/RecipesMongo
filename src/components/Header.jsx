import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { isAuthUser, logout, userData } from '../redux/slices/users'
import { Box } from '@mui/system'

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export function Header() {
  const [open, setOpen] = useState(false)
  const isAuth = useSelector(isAuthUser)
  const dispatch = useDispatch()
  const userInfo = useSelector(userData)

  const handleLogOut = () => {
    dispatch(logout())
    window.sessionStorage.removeItem('token')
    setOpen(false)
  }

  return (
    <div className="HeaderContainer">
      <div id="userInfoContainer">
        <p>{userInfo?.userName}</p>
        <p>{userInfo?.userEmail}</p>
      </div>
      <div id="headerLinkContainer">
        <Link to="/">Home</Link>
        <Link to="/recipes/favourites">Favourites</Link>
        <Link to="/recipes/myrecipes">My recipes</Link>
        <Link to="/recipes/newrecipe">New Recipe</Link>
        {isAuth ? null : <Link to="/auth/registration">Registration</Link>}
        {isAuth ? (
          <Button onClick={() => setOpen(true)}>LogOut</Button>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography>
            <h2>Are u sure you want to log out?</h2>
          </Typography>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => handleLogOut()}>Yes</Button>
        </Box>
      </Modal>
    </div>
  )
}
