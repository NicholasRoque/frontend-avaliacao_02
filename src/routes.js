import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import isAuth from './utils/isAuth';
import { useUser } from "./providers/user"
import Pages from './pages';




function Routes(){
    const { user } = useUser()
    const PrivateRoute = ({component: Component,isPrivate, ...rest})=>(
        <Route {...rest} render ={props =>(
            isAuth(user.token,isPrivate)?(
                <Component {...props}/>
            ):(
                <Redirect to ={{pathname:'/',state:{from: props.location}}}/>
            )
        )}/>
    )
    
    const PublicRoute = ({component: Component, ...rest})=>(
        <Route {...rest} render ={props =>(
            isAuth(user.token)?(
                <Redirect to ={{pathname:"/home",state:{from: props.location}}}/>
            ):(
                <Component {...props}/>
            )
        )}/>
    )

                
    const NotFound = () =>(<Redirect to ={{pathname:"/home"}}/>)
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/" component={()=>(<Pages.Login />)}/>
                <PrivateRoute exact path="/home" component={()=>(<Pages.Home />)}/>
                <PrivateRoute exact path="/adicionar-vacina" isPrivate component={()=>(<Pages.AdicionarVacina />)}/>
                <PrivateRoute exact path="/adicionar-registro" component={()=>(<Pages.Registro />)}/>
                <PrivateRoute path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;