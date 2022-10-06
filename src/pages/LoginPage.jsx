import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const URL_LOGIN = "https://script.google.com/macros/s/AKfycbzeIa6cIglsNGRurc7suTjytoBVluZt5ebWVmI10S_1XxoYSLvex8PEUfe9-DUEoJGW/exec?entity=login"
const URL_CARRERAS = "https://script.google.com/macros/s/AKfycbzcXL0xn_GdwmaMAoH1TlLXVjBJqIlrYZdSwItJGn2nEpSgrBLW55-OO_41Ke9ndMpxwA/exec?entity=carreras"

const LoginPage = () => {
    // Variables de estado
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [carreraIdSelected, setCarreraIdSelected] = useState(-1)
    const [error, setError] = useState(false)
    const [carrerasList, setCarrerasList] = useState([])

    // Hook navegacion
    const navigate = useNavigate();

    const httpLogin = () => {
        // Abrir un canal de comunicacion con un backend (servidor)
    
        const prom = fetch("https://60b83e68b54b0a0017c03380.mockapi.io/users")
        prom.then((resp) => {
            // Tarea dada la respuesta del servidor
            return resp.json()
        }).then((data) => {
            // data ya es un objeto javascript
            setUsername(data[0].username)
        })
    }

    // Utilizando async/await
    const httpLoginAsyncAwait = async (codigo, password) => {
        const resp = await fetch(
            `${URL_LOGIN}&codigo=${codigo}&password=${password}`
        )
        const data = await resp.json()
        if (data.msg === "") {
            // Login es correcto
            navigate("/main")
        }else {
            // Login es incorrecto
            setError(true)
        }
    }

    const httpGetCarrerasAsyncAwait = async () => {
        const resp = await fetch(
            `${URL_CARRERAS}`
        )
        const data = await resp.json()
        setCarrerasList(data)
    }


    // Efecto secundario: Este marca una porcion de codigo que se va a ejecutar
    // una sola vez al cargar la pagina ([]), o cuando cambie una variable de estado.
    useEffect(() => {
        httpGetCarrerasAsyncAwait()
    }, [])

    const loginOnClick = () => {
        httpLoginAsyncAwait(username, password)
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
                {
                    carrerasList.map((carrera) => {
                        return <option key={`opt_${carrera.id}`} 
                            value={ carrera.id }>
                                { carrera.nombre }
                        </option>
                    })
                }
            </select>
        </div>
        <button className="btn btn-primary mt-2" 
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
                        arrAlerts.push(
                            <div key="message_username" 
                                className="alert alert-danger">
                                Ingrese Username
                            </div>
                        )
                    }
                    if (error && password === ""){
                        arrAlerts.push(
                            <div key="message_password" 
                                className="alert alert-danger">
                                Ingrese Password
                            </div>
                        )
                    }
                    if (error && carreraIdSelected === -1){
                        arrAlerts.push(
                            <div key="message_carreraIdSelected" 
                                className="alert alert-danger">
                                Seleccione carrera
                            </div>
                        )
                    }
                    if (error) {
                        arrAlerts.push(
                            <div key="message_login" 
                                className="alert alert-danger">
                                Error en Login
                            </div>
                        )
                    }
                    return arrAlerts

                })()
            }
            
        </div>
    </div>
}

export default LoginPage