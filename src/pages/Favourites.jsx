import axios from "../axios";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getFavRecipes } from '../redux/slices/recipes';
import { Link, Navigate } from 'react-router-dom'
import { isAuthUser } from "../redux/slices/users";


export function Favourites(){

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const {items} = useSelector((state) => state.recipie);
    
    const fetchFavourites = async () =>{
        const { data } = await axios.get('/recipes/favourites')
        dispatch(getFavRecipes(data))
    }

    useEffect(() =>{
        fetchFavourites()
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
                    <button>Delete from favourite</button>
                    <br></br>
                </div>
            )}</div>
        </div>
    )
}