import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa"

import "./index.css"
import { Form, FormGroup, Label, Input, Button, Alert, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Menu from './../../../components/menu'

import api from '../../../utils/api';

const AdicionarVacina = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [vacina, setVacina] = useState({ nome: "" })
    const [vacinaList, setVacinaList] = useState([])
    const [showModalEditarVacina, setShowModalEditarVacina] = useState(false)
    const [idVacina, setIdVacina] = useState()
    const [alertDiv, setAlertDiv] = useState([])

    const handleShowModalEditarVacina = (v) => {
        api.get(`/vacina/${v}`).then((res) => {
            setVacina({nome:res.data.nome})
            setIdVacina(v)
            setShowModalEditarVacina(true)

        })
    }
    const handleCloseModalEditarVacina = () => {
        setShowModalEditarVacina(false)
    }

    const handleUpdateVacina = async (e) => {
        e.preventDefault()
        let data = {
            idVacina: idVacina,
            nome: document.getElementById("nomeVacinaUpdate").value
        }

        await api.put("/vacina/update", data).then((res) => {
            handleCloseModalEditarVacina()
            setAlertDiv([<Alert color="success">Vacina atualizada com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => { setAlertDiv([]) }, 4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const handleRemoveVacina = async (idVacina) => {
        let data = { idVacina: idVacina }
        console.log(data)
        await api.delete("/vacina/remove", { data: data }).then((res) => {
            setAlertDiv([<Alert color="success">Vacina removida com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => { setAlertDiv([]) }, 4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }
    const handleAdicionarVacina = (e) => {
        e.preventDefault()
        api.post("/vacina/create", vacina).then((res) => {
            setAlertDiv([<Alert color="success">Vacina criada com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => { setAlertDiv([]) }, 4000)
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const loadVacinas = () => {
        api.get("/vacina/list").then((res) => {
            setVacinaList(res.data)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }

    const converterData = (d) => {
        let data = d.split("T")[0].split("-")
        return `${data[2]}/${data[1]}/${data[0]}`
    }

    useEffect(() => {
        loadVacinas()
    }, [])

    return (
        <div>
            <Menu />

            <div className="container" id="adicionar-vacina">

                <Form id="adicionar-vacina-form" onSubmit={handleAdicionarVacina}>
                    <FormGroup>
                        <Label for="nome" className="h5">Nome da vacina</Label><br />
                        <Input id="nome" name="nome" onChange={(e) => { setVacina({ nome: e.target.value }) }} placeholder="Nome da vacina" type="text" />
                    </FormGroup>
                    <br />
                    <Button block color="primary" type="submit">Adicionar</Button>
                </Form>
                <br />
                {alertDiv.map(a => a)}

                <Table id="table-list-vacina" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Criada em</th>
                            <th>Atual. em</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacinaList.map(vacina => (
                            <tr key={vacina.idVacina}>
                                <th scope="row">{vacina.idVacina}</th>
                                <td>{vacina.nome}</td>
                                <td>{converterData(vacina.createdAt)}</td>
                                <td>{converterData(vacina.updatedAt)}</td>
                                <td className="iconTd"><center onClick={() => handleShowModalEditarVacina(vacina.idVacina)}><FaEdit className="iconTable" /></center></td>
                                <td className="iconTd"><center onClick={() => handleRemoveVacina(vacina.idVacina)}><FaTrashAlt className="iconTable" /></center></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br />
                <br />

                {showModalEditarVacina &&


                    <Modal id="modal-editar-vacina" isOpen={handleShowModalEditarVacina}>
                        <ModalHeader  toggle={handleCloseModalEditarVacina}>
                            <span className="h3">Editar vacina</span>
                        </ModalHeader>
                        <ModalBody>
                            <Form id="update-vacina-form" onSubmit={handleUpdateVacina}>
                                <FormGroup>
                                    <Label for="nomeUpdate" className="h5">Nome da vacina</Label><br />
                                    <Input id="nomeVacinaUpdate" value={vacina.nome} name="nomeUpdate" onChange={(e) => { setVacina({ nome: e.target.value }) }} placeholder="Nome da vacina" type="text" />
                                </FormGroup>
                                <br />
                                <Button block color="primary" type="submit">Salvar</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCloseModalEditarVacina}>Voltar</Button>
                        </ModalFooter>
                    </Modal>
                }


            </div>
        </div>

    )
}

export default AdicionarVacina
