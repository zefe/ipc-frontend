import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startSignUp } from '../stateManagement/actions/authActions';
import { useForm } from '../Hooks/useForm';
import { ReactComponent as Logo }  from '../assets/images/logo.svg';

export const SignUpView = (props) => {

    const initialForm = {
        name: '',
        email: '',
        password: '',
    };

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.auth);
    const { errors } = useSelector(state => state.auth);

    const { nameError, passError, emailError } = errors;
    const [ formValues, handleInputChange ]  = useForm(initialForm);
    const { name, email, password } = formValues;

    const handleSignup = (e) => {
        e.preventDefault();        
        const { history } = props;
        dispatch(startSignUp(name, email, password, history));
    }


    return (
        <div className="signup">
            <div className="logo">
                <Logo />
            </div>
            <form onSubmit={ handleSignup} className="form">
                <div className="form-group"> 
                    <small style={{color:'red'}}>{error}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        placeholder=""
                        value={ name }
                        onChange={ handleInputChange}
                    />
                    <small style={{color:'red'}}>{nameError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        value={ email }
                        onChange={ handleInputChange}
                    />
                    <small style={{color:'red'}}>{emailError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        value={ password }
                        onChange={ handleInputChange}
                    />
                    <small style={{color:'red'}}>{passError}</small>
                </div>
                <div className="form-button">
                    <button className="btn-primary">Crear cuenta</button>
                </div>
                <div className="form-link">
                    <span>¿Ya tienes una cuenta?</span> <Link to="/signin">Iniciar sesión</Link>
                </div>
            </form>
        </div>
    )
}
