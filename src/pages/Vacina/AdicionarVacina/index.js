import React, { useState, useEffect } from 'react'
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
                </table>
                <br />
                <br />

            </div>
        </div>

    )
}

export default AdicionarVacina
