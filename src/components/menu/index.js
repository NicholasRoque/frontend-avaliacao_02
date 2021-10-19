import React from 'react'
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';
import { useUser } from '../../providers/user';

const Menu = () => {
    const { user } = useUser()

    const history = useHistory();
    console.log(user)

    const redirectHome = () => history.push("/home")
    const redirectAdicionarVacina = () => history.push("/adicionar-vacina")


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
                </NavDropdown>
            </center>
        </Nav>
    )
}

export default Menu
