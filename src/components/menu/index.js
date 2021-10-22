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
    const redirectPerfil = () => history.push("/perfil")
    const redirectDados = () => history.push("/meus-dados")
    const logout = () => {
        localStorage.clear()
        history.push("/")

    }

    return (
        <Nav className="flex-column">
            <center>
                <br />
                <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                    {user.perfil==="admin" && 
                        <>
                            <Nav.Link onClick={redirectPerfil}>Perfil</Nav.Link>
                            <Nav.Link onClick={redirectAdicionarVacina}>Vacinas</Nav.Link>
                        </>
                    }
                <Nav.Link onClick={redirectDados}>Seus dados</Nav.Link>
                <Nav.Link onClick={redirectAdicionarRegistro}>Registros</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>


            </center>
        </Nav>
    )
}

export default Menu
