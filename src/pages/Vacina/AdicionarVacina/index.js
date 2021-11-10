import React, { useState, useEffect } from 'react'
import Menu from '../../../components/menu';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import api from '../../../utils/api';
import "./index.css"

const AdicionarVacina = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [vacina, setVacina] = useState({ nome: "" })
    const [vacinaList, setVacinaList] = useState([])
    const [showModalEditarVacina, setShowModalEditarVacina] = useState(false)
    const [idVacina, setIdVacina] = useState()

    const handleShowModalEditarVacina = (v) => {
        setShowModalEditarVacina(true)
        setIdVacina(v)
    }
    const handleCloseModalEditarVacina = () => {
        setShowModalEditarVacina(false)
    }

    const handleUpdateVacina = async (e) => {
        e.preventDefault()
        let data = {
            idVacina:idVacina,
            nome:document.getElementById("nomeVacinaUpdate").value
        }

        await api.put("/vacina/update", data).then((res) => {
            console.log(res)
            loadVacinas()
        }).catch(err => {
            console.log(err);
        })
    }

    const handleRemoveVacina = async (idVacina) => {
        let data = { idVacina:idVacina }
        console.log(data)
        await api.delete("/vacina/remove",{data:data}).then((res) => {
            loadVacinas()
        }).catch(err => {
            console.log(err);
        })
    }
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
        <div>
            <Menu />

            <div className="container" id="adicionar-vacina">

                <form id="adicionar-vacina-form" onSubmit={handleAdicionarVacina}>
                    <label for="nome">Nome da vacina</label>
                    <input type="text" name="nome" value={vacina.nome} onChange={(e) => { setVacina({ nome: e.target.value }) }} placeholder="Nome da vacina" />
                    <button className="btn-full primary" type="submit">Adicionar</button>
                </form>
                <br />
                <table id="table-list-vacina" striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID da vacina</th>
                            <th>Nome da vacina</th>
                            <th>Criada em</th>
                            <th>Atualizada em</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacinaList.map(vacina => (
                            <tr key={vacina.idVacina}>
                                <td>{vacina.idVacina}</td>
                                <td>{vacina.nome}</td>
                                <td>{converterData(vacina.createdAt)}</td>
                                <td>{converterData(vacina.updatedAt)}</td>
                                <td><center onClick={() => handleShowModalEditarVacina(vacina.idVacina)}><FaEdit id="iconTable" /></center></td>
                                <td><center onClick={() => handleRemoveVacina(vacina.idVacina)}><FaTrashAlt id="iconTable" /></center></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                {showModalEditarVacina &&

                    <div className="modal">
                        <div className="modal-content">
                            <span>
                                Atualizar Vacina
                                <span onClick={handleCloseModalEditarVacina} className="close"><ImCross id="icon" /></span>
                            </span>
                            <hr />
                            <form id="update-vacina-form" onSubmit={handleUpdateVacina}>
                                <label for="nomeUpdate">Nome da vacina</label>
                                <input type="text" id="nomeVacinaUpdate" name="nomeUpdate" placeholder="Nome da vacina" />
                                <button className="btn-full primary" type="submit">Adicionar</button>
                            </form>
                        </div>

                    </div>
                }


            </div>
        </div>

    )
}

export default AdicionarVacina
