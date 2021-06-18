import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../stateManagement/actions/authActions';
import { ReactComponent as Logo }  from '../../assets/images/logo.svg';
import { ReactComponent as IconLogout }  from '../../assets/icons/icon-logout.svg';
import person from '../../assets/images/person.png';

export const Header = () => {
    
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch( startLogout() );
    }
    
    const googleUser = localStorage.getItem('name') || '';
    const imageUrl = localStorage.getItem('imageUrl') || '';
    const oauth = localStorage.getItem('oauth') || '';

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <Logo />
                </Link >
            </div>
            <div className="header__info">
                <div className="header__user">
                    <img src={ (oauth === 'true') ? imageUrl : person } alt="user" />
                    <p>{ (oauth === 'true') ? googleUser : name }</p>
                </div>
                <div className="header__logout">
                <Link to="/login" onClick={ handleLogout }>
                    <IconLogout />
                </Link>
                </div>
            </div>
        </header>
    )
}
