import { React, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { startChecking } from '../stateManagement/actions/authActions';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginView } from '../views/LoginView';
import { SignUpView } from '../views/SignupView';
import { HomeView } from '../views/HomeView';
import { Loading } from '../Components/Common/Loading';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking , uid } = useSelector( state => state.auth)

    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch])
    
    if( checking ) {
        return(
            <Loading />
        )
    }


    return (
        <Router>
                <Switch>
                    <PublicRoute
                        exact 
                        path="/login" 
                        component={ LoginView }
                        isAuthenticated={ !!uid }
                    />
                    <PublicRoute
                        exact 
                        path="/signup" 
                        component={ SignUpView }
                        isAuthenticated={ !!uid }
                    />                    
                    <PrivateRoute
                        exact 
                        path="/" 
                        component={ HomeView } 
                        isAuthenticated={ !!uid }
                    />
                    <Redirect to="/" />
               </Switch>
        </Router>
    )
}
