import React, { useState, useContext, useEffect } from 'react';
import { API } from '../api-service';
import { TokenContext } from '../index';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const [ token, setToken ] = useContext(TokenContext)

    useEffect(() => {
        console.log({token})
        if(token)
            window.location.href = "/movies"
    }, [token])

    const loginClicked = () => {
        if(!username || !password){
            alert('Please fill all fields')
        }
        else{
            API.loginUser({username, password})
                .then(res => {
                    console.log({res})
                    setToken(res.token)
                })
                .catch(err => console.log({err}))
        }
    }

    return <div>
        <label htmlFor={'username'}> Username </label> <br />
        <input id={'username'} type="text" placeholder={"username"} value={username} 
            onChange={(e) => setUsername(e.target.value)} /> 
        <br />

        <label htmlFor={'password'}> Password </label> <br />
        <input id={'password'} type={"pass"} placeholder={"********"}
            value={password} onChange={(e) => setPassword(e.target.value)} /> 
        <br />
        <button onClick={loginClicked}> Login </button>
    </div>
}

export default Auth