import React from "react";


function PopupWithForm({title, name, onSubmit, isOpen, onClose, buttonText, children}) {

    return ((
        <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
            <button type='reset' className='popup__close-button' onClick={onClose}/>

            <form action='#' method='GET' name={name}
                  className='popup__container' onSubmit={onSubmit} noValidate>
                <h3 className='popup__title'>{title}</h3>
                {children}
                <button type='submit' className='popup__save-button'>{buttonText}</button>
            </form>

        </div>
    ));
}

export default PopupWithForm;