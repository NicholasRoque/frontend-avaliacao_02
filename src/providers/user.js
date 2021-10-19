import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext({})

export const UserProvider = (props) => {
    const [user,setUser] = useState({token:"",perfil:"",idUsuario:""})
    useEffect(() => {
        const token = localStorage.getItem("token")
        const idUsuario = localStorage.getItem("idUsuario")
        const perfil = localStorage.getItem("perfil")

        if(token){
            setUser({token:token,perfil:perfil,idUsuario:idUsuario})
        } else {
            setUser({token:"",perfil:"",idUsuario:""})
        }
      }, []);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext)