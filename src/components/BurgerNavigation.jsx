import { Link, NavLink } from 'react-router-dom'
import '../styles/componentsStyles/BurgerNavigation.css'

export function BurgerNavigation(props) {
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
          {props.isAuth ? (
            <div className="menu__item">
              <button
                className="logOutBtn"
                onClick={() => props.setOpen(true)}
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
          {props.isAuth ? null : (
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
