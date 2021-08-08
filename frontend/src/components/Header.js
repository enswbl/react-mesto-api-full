import React from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import whiteLogo from '../images/white-logo.svg'


const Header = ({userData}) => {

    const history = useHistory();

    const signOut = () => {
        localStorage.removeItem('token');
        history.push('/sign-up');
    }

    const location = useLocation();
    const currentPath = location.pathname;

    return ((
        <header className='header'>

            <a href='/users/me'><img src={whiteLogo} alt='Логотип' className='header__logo'/></a>

            <div className='header__container'>
            {currentPath === '/users/me' &&
            <>
                <p className='header__email'>{userData.email}</p>
                <Link className='header__button header__button_sign-in' onClick={signOut}>Выйти</Link>
            </>
            }

            {currentPath === '/sign-up' &&
            <Link className='header__button' to="/sign-in">Войти</Link>
            }

            {currentPath === '/sign-in' &&
            <Link className='header__button' to="/sign-up">Регистрация</Link>
            }
            </div>
        </header>
    ));
}

export default Header;
