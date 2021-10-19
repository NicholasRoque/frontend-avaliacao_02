import React from 'react'
import { Row, Container, Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import "./index.css"

const Home = () => {
    return (
        <Container id="home" fluid>
            <Row>
                <Col id="menu" xs={2}>
                    <Menu />
                </Col>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Home
