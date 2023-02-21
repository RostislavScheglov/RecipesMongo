import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { isAuthUser, logout, userData } from '../redux/slices/users'
import { Box } from '@mui/system'

// export const style = {

// }

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
      <div id="logo"></div>
      <div id="headerLinkContainer">
        <Link to="/">Feed</Link>
        <Link to="/recipes/favourites">Favourites</Link>
        <Link to="/recipes/myrecipes">My recipes</Link>
        <Link to="/recipes/newrecipe">New Recipe</Link>
        {isAuth ? null : <Link to="/auth/registration">Registration</Link>}{' '}
        {isAuth ? (
          <div id="userInfoContainer">
            <p>{userInfo?.userName}</p>
            <p>{userInfo?.userEmail}</p>
          </div>
        ) : null}
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
        <Box id="modalWindow">
          <Typography>
            <h2>Are u sure you want to log out?</h2>
          </Typography>
          <div id="btnContainer">
            <Button onClick={() => setOpen(false)}>No</Button>
            <Button onClick={() => handleLogOut()}>Yes</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
