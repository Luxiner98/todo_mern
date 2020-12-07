import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import {userDataContext} from '../App';

export default function Login() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [,setUserData] = useContext(userDataContext);

    const handleErrors = async response=>{
        if(!response.ok){
            const {message} = await response.json();
            //console.log(message);
            throw Error(message);
        }
        return response.json();
    }

    const login = e =>{
        e.preventDefault();
        fetch('http://localhost:3001/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username,
                password
            })
        })
        .then(handleErrors)
        .then(()=>{
            setUserData({
                username,
                password
            })
            history.push('/todo');
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    const history = useHistory();

    return (
        <div>
        <h1>Login</h1>
        {error}
            <form onSubmit={login}>
                <label>Username:</label>
                <br></br>
                <input 
                    onChange={e=>setUsername(e.target.value)} 
                    placeholder='username'
                />
                <br></br>
                <label>Password:</label>
                <br></br>
                <input 
                    type='password'
                    onChange={e=>setPassword(e.target.value)} 
                    placeholder='password'
                />
                <br></br>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}