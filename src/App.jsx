import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Login } from './pages/Login'
import { AllRecipes } from './pages/AllRecipes'
import { Registration } from './pages/Registration'
import { Favourites } from './pages/Favourites'
import { MyRecipes } from './pages/MyRecipes'
import { NewRecipe } from './pages/NewRecipe'
import { FullRecipe } from './pages/FullRecipe'
import { useEffect } from 'react'
import axios from './axios'
import { useDispatch } from 'react-redux'
import { getMeInfo } from './redux/slices/users'
import { EditRecipe } from './pages/EditRecipe'

import { ErrorsList } from './components/ErrorsList'
import { ForgotPassword } from './pages/ForgotPassowrd'
import { AuthorRecipes } from './pages/AuthorRecipes'

function App() {
  const dispatch = useDispatch()

  const authMe = () => {
    axios
      .post('/auth/me')
      .then((res) => {
        dispatch(getMeInfo(res.data))
      })
      .catch((err) => {
        const x = err.response.data.map((err) => err.msg)
        console.log(x)
        console.log([err.response.data.message])
      })
  }

  useEffect(() => {
    authMe()
  }, [])

  return (
    <div className="AppContainer">
      {/* <ErrorsList /> */}
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
          path="/auth/registration"
          element={<Registration />}
        />
        <Route
          path="/auth/login"
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
