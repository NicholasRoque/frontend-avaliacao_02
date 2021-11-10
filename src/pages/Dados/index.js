import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu';
import api from '../../utils/api';
import "./index.css"

const Dados = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const handleUpdateSenha = async (e) => {
        e.preventDefault()
        console.log(e.target.senha.value)
        let data = {
            senha: e.target.senha.value
        }
        await api.put("/usuario/update/senha", data).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    const handleUpdateEmail = async (e) => {
        e.preventDefault()
        let data = {
            email: e.target.email.value
        }
        await api.put("/usuario/update/email", data).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div>
            <Menu />
            <div className="container" id="update-dados" >


                    <form id="form-update-email" onSubmit={handleUpdateEmail}>
                        <label for="email">Email:</label>
                        <input required name="email" type="email" placeholder="email@email.com" aria-label="Email" aria-describedby="" />
                        <button className="primary" type="submit" id="btn-update-email">Atualizar</button>
                    </form>
                    <br />
                    <hr />
                    <form id="form-update-senha" onSubmit={handleUpdateSenha}>
                        <label for="senha">Senha:</label>
                        <input name="senha" required type="password" aria-label="Senha" aria-describedby="" />
                        <button className="primary" type="submit" id="btn-update-senha">Atualizar</button>
                    </form>
            </div>
        </div>
    )
}

export default Dados
