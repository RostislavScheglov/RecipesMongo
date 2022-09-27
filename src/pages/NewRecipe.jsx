import axios from '../axios';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { isAuthUser } from '../redux/slices/users';
import { useForm } from 'react-hook-form'; 
import { Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton, } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { getNewRecipe } from '../redux/slices/recipes';


export function NewRecipe(){

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const [err, setErr] = useState();
    const [isErr, setIsErr] = useState(false);
    const [ingredients, setIngredient] = useState([]);

   
    const createNewRecipe = async (params) =>{
            params.ingredients = ingredients;
            axios.post('/recipes', params).then((res) =>{
            dispatch(getNewRecipe(res.data))
            reset();
            setIngredient([])
            }).catch((err) =>{
                if('message' in err.response.data){
                    setErr([err.response.data.message])
                    setIsErr(true)
                }
                const x = err.response.data.errors.map(err =>err.msg);
                setErr(x)
                setIsErr(true)
            })
    }

    const deleteIngredient = (ingredient)=>{
        const index = ingredients.indexOf(ingredient)
        ingredients.splice(index, 1)
        setIngredient(ingredients=>[...ingredients])
    }

    
    const {register, handleSubmit, getValues, resetField, setError, reset,
        formState:{errors, isValid}
    } = useForm({
        defaultValues:{
            title:'',
            description:'',
            ingredients:'',
        },
    });


    if(!isAuth){
        return <Navigate to='/auth/login'/>
    }

    return(
        <>
            <>
                {isErr ? <div>{err.map((err, index) =><Alert key={index} severity="error">{err}</Alert>)}</div>:null}
            </>
            <form onSubmit={handleSubmit(createNewRecipe)}>
                <TextField 
                    type='text' 
                    variant='standard'
                    label='Title'
                    error = {Boolean(errors.title?.message)}
                    helperText={errors.title?.message} 
                    {...register('title', {required:'Title required'})}
                />
                <TextField 
                    type='text' 
                    variant='standard'
                    label='Description'
                    error = {Boolean(errors.description?.message)}
                    helperText={errors.description?.message} 
                    {...register('description', {required:'Description required'})}
                />
                <TextField
                    type='text'
                    variant='standard' 
                    label='Ingredient'
                    error = {Boolean(errors.ingredients?.message)}
                    helperText={errors.ingredients?.message} 
                    {...register('ingredients')}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton                                                    
                            >
                             <Add 
                                onClick={()=>{
                                    if(getValues('ingredients').length >= 3){
                                        setIngredient(ingredient=>[...ingredient, getValues('ingredients')])
                                        resetField('ingredients')
                                    }else{
                                        setError('ingredients', { type: 'custom', message: 'Minimum ingredient lenght should be 3 symbols' });
                                    }
                                }}
                             />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                <div>
                    <ol>{ingredients.map((ingredient, index)=> 
                        <li key={index}>{ingredient}
                        <Delete
                            onClick = {()=>{deleteIngredient(ingredient)}}
                        >
                        </Delete></li>)}
                    </ol>
                </div>
                <Button type='submit' variant="outlined">Enter</Button>
            </form>
        </>
    )
}                                    

