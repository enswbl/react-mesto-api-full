import React from 'react';
import {useHistory} from 'react-router-dom';

import success from "../images/success.svg";
import fail from "../images/fail.svg";


function InfoTooltip({status, isOpen, setShowStatus}) {

    const history = useHistory();

    const closeTrue = () => {
        setShowStatus({isOpen: false})

        setTimeout(() => {
            history.push('/sign-in')
        }, 300)
    }

    const closeFalse = () => {
        setShowStatus({isOpen: false});
    }

    return ((
        <div className={`popup popup-status ${isOpen ? 'popup_opened' : ''}`}>

            {status ?
                <button type='reset' className='popup__close-button popup__close-button_status' onClick={closeTrue}/>
                :
                <button type='reset' className='popup__close-button popup__close-button_status' onClick={closeFalse}/>
            }
            <div className='popup__container'>
                <img src={status ? success : fail} alt={status ? 'success' : 'fail'} className='popup__icon'/>
                <h3 className='popup__status-name'>{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!\n' +
                    'Попробуйте ещё раз.'}</h3>
            </div>
        </div>
    ));
}

export default InfoTooltip;

