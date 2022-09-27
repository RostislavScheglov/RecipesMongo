import axios from '../axios';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { getLoginInfo, isAuthUser } from '../redux/slices/users';
import { useForm } from 'react-hook-form'; 
import { Navigate } from 'react-router-dom'
import { Button, TextField, Alert, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';





export function Login(){

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const [err, setErr] = useState();
    const [isErr, setIsErr] = useState(false);
    const [showPass, setShowPass] = useState(false)
   

    const setTokenLocal = (data) =>{
        if('token' in data){
            window.sessionStorage.setItem('token', data.token)
        }
    }

    const fetchLogin = (params) =>{
        axios.post('/auth/login', params).then((res) =>{
         dispatch(getLoginInfo(res.data))
         setTokenLocal(res.data)
        }).catch((err) =>{
            if(err.response.status === 400){
                const x = err.response.data.map(err =>err.msg);
                setErr(x)
                setIsErr(true)
            }
            setErr([err.response.data.message])
            setIsErr(true)
        })
    }
    
    const {register, handleSubmit,
        formState:{errors, isValid}
    } = useForm({
        defaultValues:{
            userEmail:'',
            userPassword:''
        },
        mode: 'onChange'
    });

    if(isAuth){
        return <Navigate to='/'/>
    }

    return(
        <>
            <>
                {isErr ? <div>{err.map((err, index) =><Alert key={index} severity="error">{err}</Alert>)}</div>:null}
            </>
            <form onSubmit={handleSubmit(fetchLogin)}>
            <TextField 
                    type='email' 
                    variant='standard'
                    label='Email'
                    error = {Boolean(errors.userEmail?.message)}
                    helperText={errors.userEmail?.message} 
                    {...register('userEmail', {required:'Email required'})}
                />
                <TextField
                    type={showPass ? 'text' : 'password'} 
                    variant='standard' 
                    label='Password'
                    error = {Boolean(errors.userPassword?.message)}
                    helperText={errors.userPassword?.message} 
                    {...register('userPassword', {required:'Password required'})}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick = {()=>setShowPass(!showPass)}                                                    
                            >
                            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}  
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                <Button type='submit' disabled={!isValid} variant="outlined">Enter</Button>
            </form>
        </>
    )
}