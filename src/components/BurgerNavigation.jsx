import { Link, NavLink } from 'react-router-dom'
import '../styles/componentsStyles/BurgerNavigation.css'
import settings from '../styles/assets/svgs/settings.svg'
import userAvatarPlaceholder from '../styles/assets/userAvatarPlaceholder.png'
export function BurgerNavigation({ userInfo, isAuth, setOpen }) {
  return (
    <div className="hamburger-menu">
      <input
        id="menu__toggle"
        type="checkbox"
      />
      <label
        className="menu__btn"
        htmlFor="menu__toggle"
      >
        <span></span>
      </label>

      <ul className="menu__box">
        <li>
          {isAuth ? (
            <NavLink
              className="personalInfoSettingsBtn"
              to="/user/editPersonalInfo"
            >
              <div
                className="userInfoContainer"
                style={{ border: 'none', padding: 0, marginBottom: '0.5em' }}
              >
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
                  <span className="userEmail">{userInfo.userEmail}</span>
                </div>
              </div>
            </NavLink>
          ) : null}
        </li>
        <li>
          <NavLink
            className="menu__item"
            to="/"
          >
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menu__item"
            to="/recipes/favourites"
          >
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menu__item"
            to="/recipes/myrecipes"
          >
            My recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menu__item"
            to="/recipes/newrecipe"
          >
            New Recipe
          </NavLink>
        </li>
        <li>
          {isAuth ? (
            <div className="menu__item">
              <button
                className="logOutBtn"
                onClick={() => setOpen(true)}
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink
              className="menu__item"
              to="/user/login"
            >
              Login
            </NavLink>
          )}
        </li>
        <li>
          {isAuth ? null : (
            <div className="menu__item">
              <Link
                className="registrBtn"
                to="/user/registration"
              >
                Registration
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}
