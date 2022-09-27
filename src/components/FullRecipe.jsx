import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from "react-redux";
import { userId } from "../redux/slices/users";
import { Box, Button, Modal, Typography } from '@mui/material';
import { style } from "./Header";
import { setRecipe } from "../redux/slices/recipes";

export function FullRecipe(){

    const [item, setItem] = useState();
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const userInfo = useSelector((userId))


    
    useEffect(() =>{
         axios.get(`/recipes/${id}`).then((res) =>{
            setItem(res.data)
            setRecipe(res.data)
            setLoading(false)
            }).catch((err) =>{
                alert('Error while loading recipe')
                console.warn(err)
            })
    },[]);

    
    const fetchDeleteRecipe = (id)=>{
        axios.delete(`/recipes/${id}`).then(()=>{
            setItem([])
        }).catch((err) =>{
            alert('Error while deleting recipe')
            console.warn(err)
        })
    }
    const handleDelete = (id) =>{
        fetchDeleteRecipe(id)
        setOpen(false)
    }

    const showState = ()=>{
            console.log(item);
        }
    

    if(isLoading){
        return <div>Loading recipe...</div>
    }

    if(item.length===0){
        return <Navigate to='/recipes/myrecipes' replace={true}/>
    }

    return(
        <div>
            <div>
                <div>
                    { userInfo === item.author ? 
                        <EditOutlinedIcon 
                            onClick = {()=>showState()}
                        /> : null
                    }
                    { userInfo === item.author ? 
                        <DeleteForeverIcon 
                            onClick = {()=>setOpen(true)}
                        /> : null
                    }
                    <div id="Title">{item.title}</div> 
                    <div id="img">{item.recipeImage}</div>
                    <div id="Description">{item.description}</div>
                    <div id="Ingredients">{item.ingredients.map((ingredient, index) =>
                        <li key = {index}>{ingredient}</li>)}
                    </div>
                    <div id="Author">{item.author.userName}</div>
                    <div id="CreatedAt">{item.createdAt}</div>
                    <div id="Views Count">{item.viewsCount}</div>
                    <div id="Likes Count">{item.likesCount}</div> 
                </div>
            </div>
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
            >
                <Box sx={style}>
                    <Typography><h2>Are u sure you want to DELETE recipe?</h2></Typography>
                    <Button onClick={()=>setOpen(false)}>No</Button>
                    <Button onClick={()=>handleDelete(id)}>Yes</Button>
                </Box>
            </Modal>
        </div>
    )
}