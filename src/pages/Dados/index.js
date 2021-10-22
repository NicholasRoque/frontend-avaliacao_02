import React, { useState, useEffect } from 'react'
import { Row, Container, Col, Form, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import Menu from '../../components/menu';
import api from '../../utils/api';
import "./index.css"

const Dados = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const handleUpdateSenha = async (e) => {
        e.preventDefault()
        console.log(e.target.senha.value)
        let data = {
            senha: e.target.senha.value
        }
        await api.put("/usuario/update/senha", data).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    const handleUpdateEmail = async (e) => {
        e.preventDefault()
        let data = {
            email: e.target.email.value
        }
        await api.put("/usuario/update/email", data).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <Container id="update-dados" fluid>
            <Row>
                <Col id="menu" xs={2}>
                    <Menu />
                </Col>
                <Col >
                    <div id="dados">
                        <Form onSubmit={handleUpdateEmail}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl required type="email" placeholder="email@email.com" aria-label="Email" aria-describedby="" />
                                    <Button type="submit" variant="primary" id="btn-update-email">Atualizar</Button>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                        <br />
                        <hr />
                        <Form onSubmit={handleUpdateSenha}>
                            <Form.Group className="mb-3" controlId="senha">
                                <Form.Label>Senha</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl required type="password" aria-label="Senha" aria-describedby="" />
                                    <Button type="submit" variant="primary" id="btn-update-senha">Atualizar</Button>
                                </InputGroup>
                            </Form.Group>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dados
