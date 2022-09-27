import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { AllRecipes } from './pages/AllRecipes';
import { Registration } from './pages/Registration';
import { Favourites } from './pages/Favourites';
import { MyRecipes } from './pages/MyRecipes';
import { NewRecipe } from './pages/NewRecipe';
import { FullRecipe } from './components/FullRecipe';
import { useEffect } from 'react';
import axios from './axios';
import { useDispatch } from 'react-redux';
import { getMeInfo } from './redux/slices/users';


function App() {
  const dispatch = useDispatch();

  const authMe = () =>{
    axios.post('/auth/me').then((res) =>{
    dispatch(getMeInfo(res.data))
    }).catch((err) =>{
        if(err.response.status === 400){
            const x = err.response.data.map(err =>err.msg);
            console.log(x);
        }else{
        console.log([err.response.data.message])
        }
      })
  }

  useEffect(() =>{
    authMe()
  },[]);

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element = {<AllRecipes/>} />
            <Route path="/auth/registration" element = {<Registration/>} />
            <Route path="/auth/login" element = {<Login/>} />
            <Route path="/recipes/favourites" element = {<Favourites/>} />
            <Route path="/recipes/myrecipes" element = {<MyRecipes/>} />
            <Route path="/recipes/newrecipe" element = {<NewRecipe/>} />
            <Route path="/recipes/:id" element = {<FullRecipe/>} />
        </Routes>
    </div>
  );
}

export default App;
