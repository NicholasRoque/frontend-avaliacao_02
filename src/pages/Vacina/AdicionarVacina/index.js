import React,{ useState } from 'react'
import { Row, Container, Col, Form, Button} from 'react-bootstrap';
import Menu from '../../../components/menu';
import "./index.css"

const AdicionarVacina = () => {
    const [vacina,setVacina] = useState()
    const handleAdicionarVacina = () => {
        console.log(vacina);
    }
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
                            <Form.Control type="text" name="nome" value={vacina} onChange={(e) => {setVacina(e.target.value)}} placeholder="Nome da vacina" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Adicionar</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdicionarVacina
