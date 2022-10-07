import axios from "../axios";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { Link, Navigate } from 'react-router-dom'
import { isAuthUser } from "../redux/slices/users";


export function Favourites(){

    const isAuth = useSelector(isAuthUser);
    const [items, setItem] = useState();
    const [isLoading, setLoading] = useState(true);

    const fetchFavourites = async () =>{
        const { data } = await axios.get('/recipes/favourites')
        setItem(data)
        setLoading(false)
    }

    useEffect(() =>{
        fetchFavourites()
    },[]);

    if(!isAuth){
        return <Navigate to='/auth/login'/>
    }

    if(isLoading){
        return <>Loading...</>
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