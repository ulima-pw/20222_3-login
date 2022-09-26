import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
    // Variables de estado
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [carreraIdSelected, setCarreraIdSelected] = useState(-1)
    const [error, setError] = useState(false)

    // Hook navegacion
    const navigate = useNavigate();

    const loginOnClick = () => {
        if (username !== "" && password !== "" && carreraIdSelected !== -1) {
            // Si puedo hacer el login
            navigate("/main")
        }else {
            // Error
            setError(true)
        }
    }

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
        <div>
            <label className="form-label">
                Carrera
            </label>
            <select className="form-select"
                value={ carreraIdSelected }
                onChange={ (evt) => setCarreraIdSelected(evt.target.value) }>
                <option value={ -1 }>--- Ingrese su carrera ---</option>
                <option value={ 1 }>Ingeniería de Sistemas</option>
                <option value={ 2 }>Ingeniería Industrial</option>
                <option value={ 3 }>Ingeniería Civil</option>
            </select>
        </div>
        <button className="btn btn-primary" 
            type="button"
            onClick={ loginOnClick } >
                Login
        </button>
        <div>
            {
                (() => {
                    // Validacion de formularios

                    const arrAlerts = []
                    if (error && username === ""){
                        arrAlerts.push(<div className="alert alert-danger">
                            Ingrese Username
                        </div>)
                    }
                    if (error && password === ""){
                        arrAlerts.push(<div className="alert alert-danger">
                            Ingrese Password
                        </div>)
                    }
                    if (error && carreraIdSelected === -1){
                        arrAlerts.push(<div className="alert alert-danger">
                            Seleccione carrera
                        </div>)
                    }
                    return arrAlerts

                })()
            }
            
        </div>
    </div>
}

export default LoginPage