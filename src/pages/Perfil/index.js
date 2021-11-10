import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu';
import api from '../../utils/api';
import "./index.css"

const Perfil = () => {
    const [usuarios, setUsuarios] = useState([])
    const [showtable, setShowtable] = useState(false)
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`


    const handleMudarPerfil = async (perfil, idUsuario) => {
        let data = { perfil: perfil, idUsuario: idUsuario }
        await api.put("/usuario/update/perfil", data).then((res) => {
            console.log(res);
            loadUsuarios()
            //document.getElementById(idUsuario.toString()).value = res.data.perfil
        }).catch(err => {
            console.log(err);
        })

    }

    const loadUsuarios = async () => {
        await api.get("/usuario/list").then((res) => {
            setUsuarios(res.data.usuarios)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadUsuarios()
    }, [])

    useEffect(() => {
        console.log(usuarios)
        setShowtable(true)
    }, [usuarios])
    return (
        <div>
            <Menu />

            <div className="container" id="mudar-perfil" >
                <br />
                {showtable &&
                    <table id="table-list-usuarios" >
                        <thead>
                            <tr>
                                <th>ID do usuario</th>
                                <th>Email</th>
                                <th>Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.idUsuario}>
                                    <td>{usuario.idUsuario}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <center>
                                            <select id={usuario.idUsuario} value={usuario.perfil} onChange={(e) => { handleMudarPerfil(e.target.value, usuario.idUsuario) }} aria-label="" name="usuarioPerfil" >
                                                <option value="admin">Administrador</option>
                                                <option value="user">Usuário</option>
                                            </select>
                                        </center>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Perfil
