import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { useUser } from "./../../providers/user"
import api from '../../utils/api';
import "./index.css"




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
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    return (
        <div className="container-fluid" id="login" >
            <center id="alertLogin">
                {alertDiv.map(a => a)}
            </center>
            <br />
            <Form id="login-form" onSubmit={handleLogin}>
                <FormGroup>
                    <Label for="email" className="h5">Email</Label>
                    <Input id="email" value={usuario.email} onChange={handleChange} name="email" placeholder="email@email.com" type="email" />
                </FormGroup>
                <br />
                <FormGroup>
                    <Label for="senha" className="h5">Senha</Label>
                    <Input id="senha" value={usuario.senha} onChange={handleChange} name="senha" type="password" />
                </FormGroup>

                <Button block color="primary" type="submit">Entrar</Button>
                <br />
                <Button block color="secondary" type="button" onClick={redirectCadastro}>Cadastro</Button>

            </Form>
        </div>
    )
}

export default Login
