import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup({removeIdCard, onDeleteCard, isOpen, onClose}) {

    function handleSubmit(e) {
        e.preventDefault();

        onDeleteCard(removeIdCard);
    }

    return ((
        <PopupWithForm
            title={'Вы уверены?'}
            name={'remove-card'}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Да'}
        />
    ))
}

export default ConfirmDeletePopup;