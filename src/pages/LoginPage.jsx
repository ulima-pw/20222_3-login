import React, { useState } from "react"

const LoginPage = () => {
    // Variables de estado
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div className="container">
        <h1>Login</h1>
        <div>
            <label className="form-label">
                Usuario
            </label>
            <input className="form-control"
                value={ username }
                onChange={ (evt) => setUsername(evt.target.value) } />
        </div>
        <div>
            <label className="form-label">
                Password
            </label>
            <input type="password" 
                className="form-control"
                value={ password }
                onChange={ (evt) => setPassword(evt.target.value) } />
        </div>
        <button className="btn btn-primary" 
            type="button"
            onClick={ 
                () => console.log(`Username: ${username} Password: ${password}`) 
            } >
                Login
        </button>
    </div>
}

export default LoginPage