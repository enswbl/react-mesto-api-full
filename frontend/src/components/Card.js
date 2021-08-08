import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function Card({title, image, like, owner, id, onSelectedCard, onLikeCard, onRemoveCard}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = currentUser._id === owner;

    const isLiked = like.some(i => i._id === currentUser._id);

    function handleImageClick() {
        onSelectedCard({title, image});
    }

    function handleLikeClick() {
        onLikeCard({like, id});
    }

    function handleDeleteClick() {
        onRemoveCard(id);
    }

    return ((

        <div className="card">
            <button type="submit" className={`card__remove-button ${isOwn ? 'card__remove-button_active' : ''}`}
                    onClick={handleDeleteClick}/>
            <img
                className="card__image"
                src={image} alt={title}
                onClick={handleImageClick}
            />
            <div className="card__panel">
                <h2 className="card__title">
                    {title}
                </h2>
                <div className="card__like-container">
                    <button type="submit" className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
                            onClick={handleLikeClick}/>
                    <label className="card__like-number">
                        {like.length}
                    </label>
                </div>
            </div>
        </div>

    ));
}

export default Card;
