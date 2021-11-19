import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import api from '../../utils/api';

import "./index.css"
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';



const Cadastro = () => {
    const history = useHistory();
    const redirectLogin = () => history.push("/")
    const [usuario, setUsuario] = useState({ email: "", senha: "", perfil: "" })
    const [alertDiv, setAlertDiv] = useState([])

    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleCadastro = (e) => {
        e.preventDefault()
        let data = { ...usuario }
        data.perfil = "user"
        api.post("/usuario/create", data).then((res) => {
            if (res.status === 200) {
                setAlertDiv([<Alert color="success">Usuário cadastrado com sucesso.</Alert>])
                setTimeout(() => {redirectLogin()},4000)
            }

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    return (
        <div className="container" id="cadastro">

            {/* <form id="cadastro-form" onSubmit={handleCadastro}>
                <label for="email">Email</label><br />
                <input type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="email@email.com" /><br />
                <label for="senha">Senha</label><br />
                <input value={usuario.senha} name="senha" onChange={handleChange} type="password" />
                {alertDiv.map(a => a)}
                <button className="btn-full primary" type="submit">Cadastrar</button>
                <button className="btn-full" onClick={redirectLogin}>Voltar para o login</button>
            </form> */}

            <Form id="cadastro-form" onSubmit={handleCadastro}>
                <FormGroup>
                    <Label for="email" className="h5">Email</Label>
                    <Input id="email" value={usuario.email} onChange={handleChange} name="email" placeholder="email@email.com" type="email"/>
                </FormGroup>
                <br />
                <FormGroup>
                    <Label for="senha" className="h5">Senha</Label>
                    <Input id="senha" value={usuario.senha} onChange={handleChange} name="senha" type="password"/>
                </FormGroup>
                {alertDiv.map(a => a)}
                <Button block color="primary" type="submit">Cadastrar</Button>
                <br />
                <Button block color="secondary" type="button" onClick={redirectLogin}>Voltar para o login</Button>

            </Form>
        </div>
    )
}

export default Cadastro
