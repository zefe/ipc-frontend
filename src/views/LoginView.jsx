import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { startLogin, startLoginWithGoogle } from '../stateManagement/actions/authActions';
import { useForm } from '../Hooks/useForm';
import { clientId } from '../config/google';

import { ReactComponent as Logo }  from '../assets/images/logo.svg';


export const LoginView = (props) => {

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.auth);
    

    const initialForm = {
        email: '',
        password: '',
    }

    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        const { history } = props;

        dispatch(startLogin(email, password, history));
    }

    const responseGoogle = (response) => {
        dispatch(startLoginWithGoogle(response))
    }

    return (
        <div className="login">
            <div className="logo">
                <Logo />
            </div>
            <form onSubmit={ handleLogin } className="form">
                <div className="form-group"> 
                    <small style={{color:'red'}}>{error}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        value={ email }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        value={ password }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <div className="form-button">
                    <button className="btn-primary">Log in</button>
                    <p>Or</p>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Log in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="btn-google"
                    />
                </div>
                <div className="form-link">
                    <span>Don't have an Account?</span> <Link to="/signup">Get started</Link>
                </div>
            </form>
        </div>
    )
}
