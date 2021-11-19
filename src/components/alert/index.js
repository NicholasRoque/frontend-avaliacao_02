import React, { useEffect } from 'react'
import "./index.css"
import { Alert as AlertStrap } from 'reactstrap';


const Alert = (props) => {
    useEffect(() => {
        switch (props.tema) {
            case 'info':
                document.getElementById("alert").classList.add('info')
                break;
            case 'success':
                document.getElementById("alert").classList.add('success')
                break;
            case 'danger':
                document.getElementById("alert").classList.add('danger')
                break;
            default:
                document.getElementById("alert").classList.add('info')
                break;
        }
    }, [props.tema])


    return (
        <AlertStrap id="alert" className="alert">
            {props.conteudo}
        </AlertStrap>
    )
}

export default Alert
