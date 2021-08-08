import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function Main({onEditAvatar, onEditProfile, onAddPlace, currentCards, onSelectedCard, onLikeCard, onRemoveCard}) {

    const currentUser = React.useContext(CurrentUserContext);

    return ((
        <>
            <section className='profile'>
                <img src={currentUser.avatar} alt='Аватар' className='profile__avatar'/>
                <button className='profile__edit-avatar-button' onClick={onEditAvatar}/>
                <div className='profile__info'>
                    <div className='profile__name-container'>
                        <h1 className='profile__name'>{currentUser.name}</h1>
                        <button type='button' className='profile__edit-profile-button'
                                onClick={onEditProfile}/>
                    </div>
                    <p className='profile__description'>{currentUser.about}</p>
                </div>
                <button type='button' className='profile__add-place-button' onClick={onAddPlace}/>
            </section>

            <section className='container'>
                {currentCards.map((item) => (
                    <Card
                        title={item.name}
                        image={item.link}
                        like={item['likes']}
                        owner={item.owner._id}
                        id={item._id}

                        key={item._id}
                        onSelectedCard={onSelectedCard}
                        onLikeCard={onLikeCard}
                        onRemoveCard={onRemoveCard}
                    />
                ))}
            </section>
        </>
    ));
}

export default Main;