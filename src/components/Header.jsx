import { Link, NavLink } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser, logout, userData } from '../redux/slices/users'
import { Box } from '@mui/system'
import settings from '../styles/assets/svgs/settings.svg'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'

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
            {userInfo.userImage ? (
              <img
                src={`${userInfo.userImage}`}
                className="userAvatar"
                alt="Avatar"
              ></img>
            ) : (
              <img
                src={userAvatarPlaceholder}
                className="userAvatar"
                alt="Avatar"
              ></img>
            )}
            <div className="userInfoTextContainer">
              <span className="userName">{userInfo.userName}</span>
              <span id="userEmail">{userInfo.userEmail}</span>
            </div>
            <NavLink
              id="personalInfoSettingsBtn"
              to="/user/editPersonalInfo"
            >
              <img
                src={settings}
                alt="settings"
              />
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
          <NavLink to="/user/login">Login</NavLink>
        )}
        {isAuth ? null : (
          <Link
            id="registrBtn"
            to="/user/registration"
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
