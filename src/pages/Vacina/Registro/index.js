import React, { useState, useEffect } from 'react'
import Menu from '../../../components/menu';
import api from '../../../utils/api';
import "./index.css"

const Registro = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [registro, setRegistro] = useState({ data: "", idVacina: "" })
    const [registroList, setRegistroList] = useState([])
    const [vacinaList, setVacinaList] = useState([])
    const [showtable, setShowtable] = useState(false)


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
            await loadRegistrotable(res.data)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }
    const loadRegistrotable = async (registros) => {
        let registrostable = []
        await registros.forEach(async (registro) => {
            vacinaList.forEach(vacina => {
                if (vacina.idVacina === registro.idVacina) {
                    let r = {
                        idRegistro: registro.idRegistro,
                        data: registro.data,
                        idVacina: vacina.idVacina,
                        nomeVacina: vacina.nome
                    }
                    registrostable.push(r)
                }
            })


        })
        setRegistroList(registrostable)
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
        setShowtable(true)
    }, [registroList])
    return (
        <div>
            <Menu />
            <div className="container" id="adicionar-registro">
                <form id="adicionar-registro-form" onSubmit={handleAdicionarRegistro}>
                    <label for="data">Data</label>
                    <input type="date" name="data" value={registro.nome} onChange={handleChange} placeholder="Data do registro" />
                    <select aria-label="" name="idVacina" required onChange={handleChange}>
                        <option disabled selected value="">Selecione uma vacina</option>
                        {vacinaList.map(vacina => (
                            <option key={"registro_" + vacina.idVacina} value={vacina.idVacina}>{vacina.nome}</option>
                        ))}

                    </select>
                    <button className="primary btn-full" type="submit">Adicionar</button>
                </form>
                <br />
                {showtable &&
                    <table id="table-list-registro" >
                        <thead>
                            <tr>
                                <th>ID do registro</th>
                                <th>Data</th>
                                <th>Vacina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registroList.map((registro) => (
                                <tr key={"registro_" + registro.idRegistro}>
                                    <td>{registro.idRegistro}</td>
                                    <td>{converterData(registro.data)}</td>
                                    <td>{registro.nomeVacina}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Registro
