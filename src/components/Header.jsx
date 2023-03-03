import { Link, NavLink } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { isAuthUser, logout, userData } from '../redux/slices/users'
import { Box } from '@mui/system'

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
      <nav id="headerLinkContainer">
        <NavLink to="/">Feed</NavLink>
        <NavLink to="/recipes/favourites">Favourites</NavLink>
        <NavLink to="/recipes/myrecipes">My recipes</NavLink>
        <NavLink to="/recipes/newrecipe">New Recipe</NavLink>

        {isAuth ? (
          <div id="userInfoContainer">
            <p>{userInfo?.userName}</p>
            <p>{userInfo?.userEmail}</p>
          </div>
        ) : null}
        {isAuth ? (
          <button
            id="logOutBtn"
            onClick={() => setOpen(true)}
          >
            Log out
          </button>
        ) : (
          <NavLink to="/auth/login">Login</NavLink>
        )}
        {isAuth ? null : (
          <Link
            id="registrBtn"
            to="/auth/registration"
          >
            Registration
          </Link>
        )}
      </nav>
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
