import axios from "../axios";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getAllRecipes } from '../redux/slices/recipes';
import { Link } from 'react-router-dom'
import { isAuthUser } from "../redux/slices/users";


export function AllRecipes(){

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const {items} = useSelector((state) => state.recipie);
    
    const fetchAllRecipes = async () =>{
        const { data } = await axios.get('/recipes')
        dispatch(getAllRecipes(data))
    }

    useEffect(() =>{
        fetchAllRecipes()
    },[]);

    return(
        <div>
            <div>{items.map((item) =>
                <div id='recipe' key={item._id}>
                    <br></br>
                    <div id="img">{item.recipeImage}</div>
                    <Link to={`/recipes/${item._id}`} id="Title">{item.title}</Link>
                    {isAuth ? <button>Add to fav</button> : null}
                    <br></br>
                </div>
            )}</div>
        </div>
    )
}