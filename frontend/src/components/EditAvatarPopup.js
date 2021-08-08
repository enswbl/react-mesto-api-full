import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {

    const imageRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: imageRef.current.value,
        });
        imageRef.current.value = '';
    }

    return ((
        <PopupWithForm
            title={'Обновить аватар'}
            name={'edit-avatar'}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
        >
            <input
                ref={imageRef}
                type='url'
                placeholder='Ссылка на аватар'
                name='avatarLinkInput'
                id='avatar-link-input'
                className='popup__input popup__input_add-place popup__input_avatar-link'
                autoComplete='off'
                required
            />
            <span className='popup__input-error-message avatar-link-input-error-message'/>
        </PopupWithForm>

    ))
}

export default EditAvatarPopup;