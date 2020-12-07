import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import {userDataContext} from '../App';

export default function Register() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
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

    const register = e =>{
        e.preventDefault();
        fetch('http://localhost:3001/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email,
                username,
                password
            })
        })
        .then(handleErrors)
        .then(()=>{
            setUserData({
                email,
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
        <h1>Register</h1>
        {error}
            <form onSubmit={register}>
                <label>Username:</label>
                <br></br>
                <input 
                    onChange={e=>setUsername(e.target.value)} 
                    placeholder='username'
                />
                <br></br>

                <label>Email:</label>
                <br></br>
                <input 
                    type='email' 
                    onChange={e=>setEmail(e.target.value)} 
                    placeholder='email'
                    autoComplete='off'
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

                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
