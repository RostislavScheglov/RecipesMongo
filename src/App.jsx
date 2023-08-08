import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Login } from './pages/Login'
import { AllRecipes } from './pages/AllRecipes'
import { Registration } from './pages/Registration'
import { Favourites } from './pages/Favourites'
import { MyRecipes } from './pages/MyRecipes'
import { NewRecipe } from './pages/NewRecipe'
import { FullRecipe } from './pages/FullRecipe'
import { EditRecipe } from './pages/EditRecipe'
import { ForgotPassword } from './pages/ForgotPassowrd'
import { AuthorRecipes } from './pages/AuthorRecipes'
import { EditPersonalInfo } from './pages/EditPersonalInfo'
import { ResetPassword } from './pages/ResetPassword'
import { useEffect } from 'react'
import axios from './axios'
import { useDispatch } from 'react-redux'
import { getMeInfo } from './redux/slices/users'

function App() {
  const dispatch = useDispatch()
  const getMe = () => {
    axios
      .get('/user/me')
      .then((res) => dispatch(getMeInfo(res.data)))
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getMe()
  }, [])

  return (
    <div className="AppContainer">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<AllRecipes />}
        />
        <Route
          path="/forgotPassword"
          element={<ForgotPassword />}
        />
        <Route
          path="/user/resetPassword/:userId/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/user/registration"
          element={<Registration />}
        />
        <Route
          path="/user/editPersonalInfo"
          element={<EditPersonalInfo />}
        />
        <Route
          path="/user/login"
          element={<Login />}
        />
        <Route
          path="/recipes/favourites"
          element={<Favourites />}
        />
        <Route
          path="/recipes/myrecipes"
          element={<MyRecipes />}
        />
        <Route
          path="/recipes/newrecipe"
          element={<NewRecipe />}
        />
        <Route
          path="/recipes/:id"
          element={<FullRecipe />}
        />
        <Route
          path="/recipes/edit/:id"
          element={<EditRecipe />}
        />
        <Route
          path="/recipes/author/:id"
          element={<AuthorRecipes />}
        />
      </Routes>
    </div>
  )
}

export default App
