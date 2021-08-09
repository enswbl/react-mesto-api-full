import React from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from '../utils/api';

import {CurrentUserContext} from '../contexts/CurrentUserContext'
import avatar from '../images/avatar.jpg';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import * as Auth from '../utils/auth';


function App() {

    const [editAvatarState, setEditAvatarState] = React.useState({
        isOpen: false,
    });
    const [editProfileState, setEditProfileState] = React.useState({
        isOpen: false,
    });
    const [addPlaceState, setAddPlaceState] = React.useState({
        isOpen: false,
    });

    const [selectedCard, setSelectedCardState] = React.useState({isOpen: false});

    const [selectedImage, setSelectedImageState] = React.useState({title: '', image: ''});

    const [removeCardState, setRemoveCardState] = React.useState({isOpen: false});

    const [removeIdCard, setRemoveIdCardState] = React.useState();

    const [currentUser, setCurrentUserState] = React.useState({
        avatar: avatar,
        name: 'Жак-Ив Кусто',
        about: 'Исследователь океана',
        _id: '',
    });

    const [currentCards, setCurrentCardsState] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState()

    const [userData, setUserData] = React.useState({
        email: '',
    })

    const [status, setStatus] = React.useState();
    const [showStatus, setShowStatus] = React.useState({isOpen: false});

    const history = useHistory();

    const tokenCheck = () => {
        const token = localStorage.getItem('token');
        if (token) {
            Auth.checkData(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        history.push('/users/me');
                        setUserData({email: res.user.email})
                    }
                })
                .catch((err) => {
                    console.log("Something is Wrong:", err);
                });
            return token;
        }
    }

    React.useEffect(() => {
        tokenCheck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/users/me');
        }
    }, [history, loggedIn])

    React.useEffect(() => {
        const token = tokenCheck();

        api.getUserInfo(token)
            .then((res) => {
                setCurrentUserState(res.user)
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }, [loggedIn])


    React.useEffect(() => {
        const token = tokenCheck();

        api.getInitialCards(token)
            .then((res) => {
                setCurrentCardsState(res.cards)
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }, [loggedIn]);

    const handleUpdateAvatar = ({avatar}) => {
        const token = tokenCheck();

        api.setUserAvatar({avatar}, token)
            .then((res) => {
                setCurrentUserState(res.user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }

    const handleUpdateUser = ({name, description}) => {
        const token = tokenCheck();

        api.setUserInfo({name, description}, token)
            .then((res) => {
                setCurrentUserState(res.user)
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }

    const handleAddPlaceSubmit = ({title, image}) => {
        const token = tokenCheck();

        api.sendCard({title, image}, token)
            .then((res) => {
                setCurrentCardsState(([res.card, ...currentCards]))
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }

    const handleLikeCardClick = ({like, id}) => {
        const token = tokenCheck();

        const isLiked = like.some(i => i === currentUser._id);

        if (!isLiked) {
            api.setLike(id, token, !isLiked)
                .then((result) => {
                    setCurrentCardsState((state) => state.map((c) => c._id === id ? result.card : c));
                })
                .catch((err) => {
                    console.log("Something is Wrong:", err);
                })
        } else {
            api.removeLike(id, token, isLiked)
                .then((result) => {
                    setCurrentCardsState((state) => state.map((c) => c._id === id ? result.card : c));
                })
                .catch((err) => {
                    console.log("Something is Wrong:", err);
                });
        }
    }

    const handleDeleteCardClick = (cardId) => {
        const token = tokenCheck();

        api.removeCard(cardId, token)
            .then(() => {
                setCurrentCardsState(currentCards.filter(item => item._id !== cardId))
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Something is Wrong:", err);
            });
    }

    const handleEditAvatarClick = () => {
        setEditAvatarState({isOpen: true});
    };

    const handleEditProfileClick = () => {
        setEditProfileState({isOpen: true});
    };

    const handleAddPlaceClick = () => {
        setAddPlaceState({isOpen: true});
    };

    const handleSelectedCardClick = (item) => {
        setSelectedCardState({isOpen: true});
        setSelectedImageState({title: item.title, image: item.image});
    };

    const handleRemoveCardClick = (cardId) => {
        setRemoveCardState({isOpen: true});
        setRemoveIdCardState(cardId);
    };

    const closeAllPopups = () => {
        setEditAvatarState({isOpen: false});
        setEditProfileState({isOpen: false});
        setAddPlaceState({isOpen: false});
        setRemoveCardState({isOpen: false});
        setSelectedCardState({isOpen: false});
    };

    const handleLogin = ({email, password}) => {
        return Auth.authorize({email, password})
            .then((res) => {
                if (res.user.token) {

                    setLoggedIn(true)
                    localStorage.setItem('token', res.user.token)

                    setTimeout(() => {
                        history.push('/users/me')
                    }, 2000)
                    return res;
                }
            })
            .catch(() => {
                console.log('Error!');
            })
    }

    const handleRegister = ({email, password}) => {
        return Auth.register({email, password})
            .then((res) => {
                if (res.user.email === email) {

                    setStatus(true)
                    setShowStatus({isOpen: true})

                    return res;
                }
            }).catch(() => {
                setStatus(false)
                setShowStatus({isOpen: true})
            })
    }

    return ((
        <>
            <CurrentUserContext.Provider value={currentUser}>


                <Header userData={userData}/>
                <main className='content'>

                    <Route path='/'>
                        {loggedIn && <Redirect to='/users/me'/>}
                    </Route>

                    <Switch>

                        <Route path='/sign-up'>
                            <Register handleRegister={handleRegister}
                            />
                        </Route>

                        <Route path='/sign-in'>
                            <Login handleLogin={handleLogin}/>
                        </Route>

                        <ProtectedRoute
                            exact
                            path='*'
                            loggedIn={loggedIn}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            currentCards={currentCards}
                            onSelectedCard={handleSelectedCardClick}
                            onLikeCard={handleLikeCardClick}
                            onRemoveCard={handleRemoveCardClick}
                            component={Main}
                        />

                    </Switch>

                    <section className='popups'>

                        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={editAvatarState.isOpen}
                                         onClose={closeAllPopups}/>

                        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={editProfileState.isOpen}
                                          onClose={closeAllPopups}/>

                        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={addPlaceState.isOpen}
                                       onClose={closeAllPopups}/>

                        <ConfirmDeletePopup removeIdCard={removeIdCard} onDeleteCard={handleDeleteCardClick}
                                            isOpen={removeCardState.isOpen}
                                            onClose={closeAllPopups}/>

                        <ImagePopup selectedImage={selectedImage} isOpen={selectedCard.isOpen}
                                    onClose={closeAllPopups}/>

                        <InfoTooltip status={status} isOpen={showStatus.isOpen}
                                     setShowStatus={setShowStatus}/>

                    </section>
                </main>

            </CurrentUserContext.Provider>
        </>
    ))
}

export default App;
