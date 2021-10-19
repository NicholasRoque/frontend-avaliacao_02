const isAuth = (token,isPrivate) => {
    let perfil = localStorage.getItem("perfil")
    if(token){
        if(isPrivate ){
            if(perfil==="admin"){
                return true
            } else {
                return false
            }
        } else {
            return true
        }

    } else {
        return false
    }

}

export default isAuth