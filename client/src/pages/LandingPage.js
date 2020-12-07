import React from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

export default function LandingPage() {
    return (
        <>
        <div>
            <header>
                <h1>ToDo MERN</h1>
            </header>
                <div className='landing-page'>
                    <div className='login'>
                        <Login></Login>
                    </div>
                    <hr className='vl'></hr>
                    <div className='register'>
                        <Register></Register>
                    </div>
                </div>
        </div>
        </>
    )
}