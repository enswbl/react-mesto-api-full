class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkErrors(result) {
        if (!result.ok) {
            return Promise.reject(`Error: ${result.status}`);
        }
        return result.json();
    }

    getUserInfo(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    getInitialCards(jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    setUserInfo({name, description}, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: name,
                about: description
            }),
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    setUserAvatar({avatar}, jwt) {

        console.log('avatar', avatar)

        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                //avatar: avatar,
                avatar
            }),
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    sendCard({title, image}, jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: title,
                link: image
            }),
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    setLike(item, jwt) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    removeLike(item, jwt) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

    removeCard(item, jwt) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
        }).then((result) => this._checkErrors(result));
    }

}

const api = new Api({
    baseUrl: "http://localhost:3030",  // TODO https://api.mestoapp.nomoredomains.monster
});

export default api;
