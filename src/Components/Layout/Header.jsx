import React from 'react';
import { ReactComponent as Logo }  from '../../assets/images/logo.svg';
import { ReactComponent as IconLogout }  from '../../assets/icons/icon-logout.svg';
import person from '../../assets/images/person.jpg';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <Logo />
            </div>
            <div className="header__info">
                <div className="header__user">
                    <img src={ person } alt="user" />
                    <p>Juaniot Perez Estrada</p>
                </div>
                <div className="header__logout">
                    <IconLogout />
                </div>
            </div>
        </header>
    )
}
