import axios from "../axios";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getMyRecipes } from '../redux/slices/recipes';
import { Link, Navigate } from 'react-router-dom'
import { isAuthUser } from "../redux/slices/users";


export function MyRecipes(){
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const {items} = useSelector((state) => state.recipie);
    
    const fetchMyRecipes = async () =>{
        const { data } = await axios.get('/recipes/myrecipes')
        dispatch(getMyRecipes(data))
    }


    useEffect(() =>{
        fetchMyRecipes()
    },[]);

    if(!isAuth){
        return <Navigate to='/auth/login'/>
    }

    return(
        <div>
            <div>{items.map((item) =>
                <div id='recipe' key={item._id}>
                    <br></br>
                    <div id="img">{item.recipeImage}</div>
                    <Link to={`/recipes/${item._id}`} id="Title">{item.title}</Link>
                    <button>Delete recipe</button>
                    <br></br>
                </div>
            )}</div>
        </div>
    )
}