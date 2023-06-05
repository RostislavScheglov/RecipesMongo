import { Link, NavLink } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser, logout, userData } from '../redux/slices/users'
import { Box } from '@mui/system'
import { domain } from '../axios'
import axios from 'axios'

export function Header() {
  const [open, setOpen] = useState(false)
  const isAuth = useSelector(isAuthUser)
  const dispatch = useDispatch()
  const userInfo = useSelector(userData)
  // const [userInfo, setUserInfo] = useState([])

  const handleLogOut = () => {
    dispatch(logout())
    window.sessionStorage.removeItem('token')
    setOpen(false)
  }

  // useEffect(() => {
  //   setUserInfo()
  // }, [])
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
            <img
              src={`${domain}${userInfo?.userImage}`}
              className="userAvatar"
              alt="Avatar"
            ></img>
            <div className="userInfoTextContainer">
              <span id="userName">{userInfo?.userName}</span>
              <span id="userEmail">{userInfo?.userEmail}</span>
            </div>
            <NavLink
              id="settingsBtn"
              to="/auth/editPersonalInfo"
            >
              Settings
            </NavLink>
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
          <span className="modalTitle">Are u sure you want to log out?</span>
          <div id="btnContainer">
            <button
              className="modalCancelBtn"
              onClick={() => setOpen(false)}
            >
              No
            </button>
            <button
              className="modalSubmitBtn"
              onClick={() => handleLogOut()}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
