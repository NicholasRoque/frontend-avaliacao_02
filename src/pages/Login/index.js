import React, { useState,useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';

import { useUser } from "./../../providers/user"
import api from '../../utils/api';
import "./index.css"


const Login = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const history = useHistory();
    const redirectHome = () => history.push("/home")
    const { user, setUser } = useUser()
    const [usuario,setUsuario] = useState({senha:"",email:""})

    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
          ...usuario,
          [e.target.name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        api.post("/usuario/login",usuario).then((res) => {
            let token = res.data.token
            let perfil = res.data.perfil
            let idUsuario = res.data.idUsuario
            localStorage.setItem("token",token)
            localStorage.setItem("perfil",perfil)
            localStorage.setItem("idUsuario",idUsuario)

            setUser({token:token,perfil:perfil,idUsuario:idUsuario})
            redirectHome()
            
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }

    return (
        <Container id="login" fluid>
            
            <Form id="login-form" onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="email@email.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control value={usuario.senha} name="senha" onChange={handleChange}  type="password"/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">Entrar</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Login
