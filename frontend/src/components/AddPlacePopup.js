import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({onAddPlace, isOpen, onClose}) {

    const [title, setTitleState] = React.useState('');

    const [image, setImageState] = React.useState('');

    function handleTitleChange(e) {
        setTitleState(e.target.value);
    }

    function handleImageChange(e) {
        setImageState(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            title: title,
            image: image,
        });
    }

    return ((
        <PopupWithForm
            title={'Новое место'}
            name={'add-place'}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Добавить'}
        >
            <input
                onChange={handleTitleChange}
                type='text'
                placeholder='Название'
                name='placeNameInput'
                id='place-name-input'
                className='popup__input popup__input_add-place popup__input_place-name'
                minLength='2'
                maxLength='30'
                autoComplete='off'
                required
            />
            <span className='popup__input-error-message place-name-input-error-message'/>

            <input
                onChange={handleImageChange}
                type='url'
                placeholder='Ссылка на картинку'
                name='placeLinkInput'
                id='place-link-input'
                className='popup__input popup__input_add-place popup__input_place-link'
                autoComplete='off'
                required
            />
            <span className='popup__input-error-message place-link-input-error-message'/>
        </PopupWithForm>
    ))
}

export default AddPlacePopup;