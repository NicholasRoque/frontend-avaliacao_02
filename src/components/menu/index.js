import React from 'react'
import { useHistory } from "react-router-dom";
import { useUser } from '../../providers/user';
import "./index.css"

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
            <div className="menu">
                <br />
                <button className="btn-menu" onClick={redirectHome}>Home</button>
                    {user.perfil==="admin" && 
                        <>
                            <button className="btn-menu" onClick={redirectPerfil}>Perfil</button>
                            <button className="btn-menu" onClick={redirectAdicionarVacina}>Vacinas</button>
                        </>
                    }
                <button className="btn-menu" onClick={redirectDados}>Seus dados</button>
                <button className="btn-menu" onClick={redirectAdicionarRegistro}>Registros</button>
                <button className="btn-menu" onClick={logout}>Logout</button>


            </div>
    )
}

export default Menu
