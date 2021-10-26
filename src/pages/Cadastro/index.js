import React, { useState,useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';
import api from '../../utils/api';
import "./index.css"


const Cadastro = () => {
    const history = useHistory();
    const redirectLogin = () => history.push("/")
    const [usuario,setUsuario] = useState({email:"",senha:"",perfil:""})

    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
          ...usuario,
          [e.target.name]: value
        })
    }
    const handleCadastro = (e) => {
        e.preventDefault()
        api.post("/usuario/create",usuario).then((res) => {
            if(res.status===200){
                redirectLogin()
            }
            
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }

    return (
        <Container id="cadastro" fluid>
            
            <Form id="cadastro-form" onSubmit={handleCadastro}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="email@email.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control value={usuario.senha} name="senha" onChange={handleChange}  type="password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="perfil">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Select aria-label="" name="perfil" required onChange={handleChange}>
                        <option disabled selected value="">Selecione um tipo de perfil</option>
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </Form.Select>
                </Form.Group>
                
                <br />
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">Cadastrar</Button>
                </div>
                <br />
                <div className="d-grid gap-2">
                    <Button onClick={redirectLogin} variant="primary">Voltar para o login</Button>
                </div>
            </Form>
            
        </Container>
    )
}

export default Cadastro
