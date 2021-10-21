import React from 'react'
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';
import { useUser } from '../../providers/user';

const Menu = () => {
    const { user } = useUser()

    const history = useHistory();
    const redirectAdicionarVacina = () => history.push("/adicionar-vacina")

    const redirectHome = () => history.push("/home")
    const redirectAdicionarRegistro = () => history.push("/adicionar-registro")



    return (
        <Nav className="flex-column">
            <center>
                <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                    {user.perfil==="admin" && 
                        <Nav.Link >Perfil</Nav.Link>
                    }
                <Nav.Link >Seus dados</Nav.Link>
                <NavDropdown title="Vacina" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Registros</NavDropdown.Item>
                    {user.perfil==="admin" && 
                        <NavDropdown.Item eventKey="4.2" onClick={redirectAdicionarVacina}>Adicionar vacina</NavDropdown.Item>
                    }
                    <NavDropdown.Item eventKey="4.3" onClick={redirectAdicionarRegistro}>Adicionar registro</NavDropdown.Item>

                </NavDropdown>
            </center>
        </Nav>
    )
}

export default Menu
