import React, { useState, useEffect } from 'react'
import { Row, Container, Col, Form, Button, Table } from 'react-bootstrap';
import Menu from '../../../components/menu';
import { useUser } from '../../../providers/user';
import api from '../../../utils/api';
import "./index.css"

const AdicionarVacina = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [vacina, setVacina] = useState({ nome: "" })
    const [vacinaList, setVacinaList] = useState([])

    const handleAdicionarVacina = (e) => {
        e.preventDefault()
        api.post("/vacina/create", vacina).then((res) => {
            loadVacinas()
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
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
        <Container id="adicionar-vacina" fluid>
            <Row>
                <Col id="menu" xs={2}>
                    <Menu />
                </Col>
                <Col>
                    <Form id="adicionar-vacina-form" onSubmit={handleAdicionarVacina}>
                        <Form.Group className="mb-3" controlId="vacina">
                            <Form.Label>Nome da vacina</Form.Label>
                            <Form.Control type="text" name="nome" value={vacina.nome} onChange={(e) => { setVacina({ nome: e.target.value }) }} placeholder="Nome da vacina" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Adicionar</Button>
                        </div>
                    </Form>
                    <br />
                    <Table id="table-list-vacina" striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID da vacina</th>
                                <th>Nome da vacina</th>
                                <th>Criada em</th>
                                <th>Atualizada em</th>
                            </tr>
                        </thead>
                        <tbody>
                        {vacinaList.map(vacina => (
                            <tr key={vacina.idVacina}>
                                <td>{vacina.idVacina}</td>
                                <td>{vacina.nome}</td>
                                <td>{converterData(vacina.createdAt)}</td>
                                <td>{converterData(vacina.updatedAt)}</td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default AdicionarVacina
