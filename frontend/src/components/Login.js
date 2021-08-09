import React from 'react';
import {withRouter} from 'react-router-dom';

const Login = ({handleLogin}) => {
    const [userData, setUserData] = React.useState({email: '', password: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(userData)

    }

    return ((
        <>
            <form action='#' method='GET' onSubmit={handleSubmit} className="login">
                <h1 className='login__title'>Вход</h1>

                <input onChange={handleChange}
                       value={userData.email}
                       id="email"
                       name="email"
                       className="login__input"
                       type='email'
                       placeholder='Email'
                       minLength='2'
                       maxLength='30'
                       autoComplete='off'
                       required/>

                <input onChange={handleChange}
                       value={userData.password}
                       id="password"
                       name="password"
                       className="login__input"
                       type='password'
                       placeholder='Пароль'
                       minLength='2'
                       maxLength='30'
                       autoComplete='off'
                       required/>

                <button type="submit" className="login__button login__button_sign-in ">Войти</button>
            </form>
        </>

    ));
}

export default withRouter(Login);