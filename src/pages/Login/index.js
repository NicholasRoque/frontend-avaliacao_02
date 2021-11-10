import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { useUser } from "./../../providers/user"
import api from '../../utils/api';
import "./index.css"
import Alert from '../../components/alert';


const Login = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const history = useHistory();
    const redirectHome = () => history.push("/home")
    const redirectCadastro = () => history.push("/cadastro")

    const { user, setUser } = useUser()
    const [usuario, setUsuario] = useState({ senha: "", email: "" })
    const [alertDiv, setAlertDiv] = useState([])

    
    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        api.post("/usuario/login", usuario).then((res) => {
            let token = res.data.token
            let perfil = res.data.perfil
            let idUsuario = res.data.idUsuario
            localStorage.setItem("token", token)
            localStorage.setItem("perfil", perfil)
            localStorage.setItem("idUsuario", idUsuario)

            setUser({ token: token, perfil: perfil, idUsuario: idUsuario })
            redirectHome()

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
            setAlertDiv(errors)
        })
    }

    return (
        <div className="container" id="login" >
            <form id="login-form" onSubmit={handleLogin}>
                <label for="email">Email</label><br />
                <input type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="email@email.com" /><br />
                <label for="senha">Senha</label><br />
                <input value={usuario.senha} name="senha" onChange={handleChange} type="password" />
                {alertDiv.map(a => a)}
                <button className="btn-full primary" type="submit">Entrar</button>
                <button onClick={redirectCadastro} className="btn-full">Cadastro</button>
            </form>

        </div>
    )
}

export default Login
