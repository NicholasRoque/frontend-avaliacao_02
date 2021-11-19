import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu';
import { Form, FormGroup, Label, Input, Button, Alert, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import api from '../../utils/api';
import "./index.css"

const Dados = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const [alertDiv, setAlertDiv] = useState([])

    const handleUpdateSenha = async (e) => {
        e.preventDefault()
        console.log(e.target.senha.value)
        let data = {
            senha: e.target.senha.value
        }
        await api.put("/usuario/update/senha", data).then((res) => {

            setAlertDiv([<Alert color="success">Senha atualizada com sucesso.</Alert>])
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })

    }

    const handleUpdateEmail = async (e) => {
        e.preventDefault()
        let data = {
            email: e.target.email.value
        }
        await api.put("/usuario/update/email", data).then((res) => {
            setAlertDiv([<Alert color="success">Email atualizada com sucesso.</Alert>])

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })

    }
    return (
        <div>
            <Menu />
            <div className="container" id="update-dados" >

                <Form id="form-update-email" onSubmit={handleUpdateEmail}>
                    <FormGroup>
                        <Label for="email" className="h5">Email:</Label><br />
                        <Input id="email" name="email" placeholder="email@email.com" type="email" />
                    </FormGroup>
                    <br />
                    <Button block color="primary" type="submit">Atualizar</Button>
                </Form>
                <hr id="linhaSeparadora"/>
                <br /><br />
                <Form id="form-update-senha" onSubmit={handleUpdateSenha}>
                    <FormGroup>
                        <Label for="senha" className="h5">Senha:</Label><br />
                        <Input id="senha" name="senha" type="password" />
                    </FormGroup>
                    <br />
                    <Button block color="primary" type="submit">Atualizar</Button>
                </Form>
                <br />
                {alertDiv.map(a => a)}

            </div>
        </div>
    )
}

export default Dados
