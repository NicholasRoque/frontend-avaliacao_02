import React, { useState, useEffect } from 'react'
import { Row, Container, Col, Form, Button, Table } from 'react-bootstrap';
import Menu from '../../../components/menu';
import api from '../../../utils/api';
import "./index.css"

const Registro = () => {

    const [registro, setRegistro] = useState({ data: "", idVacina: "" })
    const [registroList, setRegistroList] = useState([])
    const [vacinaList, setVacinaList] = useState([])
    const [showTable, setShowTable] = useState(false)


    const handleAdicionarRegistro = async (e) => {
        e.preventDefault()
        console.log(registro)
        await api.post("/registro/create", registro).then(async (res) => {
            await loadRegistros()
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }
    
    const loadRegistros = async () => {
        await api.get("/registro/list").then(async (res) => {
            await loadRegistroTable(res.data)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }
    const loadRegistroTable = async (registros) => {
        let registrosTable = []
        await registros.forEach(async (registro) => {
                vacinaList.forEach(vacina => {
                    if(vacina.idVacina===registro.idVacina){
                        let r = {
                            idRegistro:registro.idRegistro,
                            data:registro.data,
                            idVacina:vacina.idVacina,
                            nomeVacina:vacina.nome
                        }
                        registrosTable.push(r)
                    }
                })
                
            
        })
        setRegistroList(registrosTable)
    }

    const loadVacinas = () => {
        api.get("/vacina/list").then((res) => {
            setVacinaList(res.data)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }


    const handleChange = (e) => {
        const value = e.target.value;
        setRegistro({
            ...registro,
            [e.target.name]: value
        })
    }

    const converterData = (d) => {
        let data = d.split("T")[0].split("-")
        return `${data[2]}/${data[1]}/${data[0]}`
    }

    useEffect(() => {
        loadVacinas()

    }, [])

    useEffect(() => {
        loadRegistros()
    }, [vacinaList])

    useEffect(() => {
        setShowTable(true)
    }, [registroList])
    return (
        <Container id="adicionar-registro" fluid>
            <Row>
                <Col id="menu" xs={2}>
                    <Menu />
                </Col>
                <Col>
                    <Form id="adicionar-registro-form" onSubmit={handleAdicionarRegistro}>
                        <Form.Group className="mb-3" controlId="registro">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" name="data" value={registro.nome} onChange={handleChange} placeholder="Data do registro" />
                        </Form.Group>
                        <Form.Select aria-label="" name="idVacina" required onChange={handleChange}>
                            <option disabled selected value="">Selecione uma vacina</option>
                            {vacinaList.map(vacina =>(
                                <option key={"registro_"+vacina.idVacina} value={vacina.idVacina}>{vacina.nome}</option>
                            ))}
                            
                        </Form.Select>
                        <br />
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Adicionar</Button>
                        </div>
                    </Form>
                    <br />
                    {showTable &&
                        <Table id="table-list-registro" striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID do registro</th>
                                <th>Data</th>
                                <th>Vacina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registroList.map((registro) => (
                                <tr key={"registro_"+registro.idRegistro}>
                                    <td>{registro.idRegistro}</td>
                                    <td>{converterData(registro.data)}</td>
                                    <td>{registro.nomeVacina}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    }
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Registro
