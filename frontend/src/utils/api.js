class Api {
    constructor({baseUrl, authorization}) {
        this._baseUrl = baseUrl;
        this._authorization = authorization;
    }

    _checkErrors(result) {
        if (!result.ok) {
            return Promise.reject(`Error: ${result.status}`);
        }
        return result.json();
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: this._authorization,
            },
        }).then((result) => this._checkErrors(result));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: this._authorization,
            },
        }).then((result) => this._checkErrors(result));
    }

    setUserInfo({name, description}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._authorization,
            },
            body: JSON.stringify({
                name: name,
                about: description
            }),
        }).then((result) => this._checkErrors(result));
    }

    setUserAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._authorization,
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then((result) => this._checkErrors(result));
    }

    sendCard({title, image}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._authorization,
            },
            body: JSON.stringify({
                name: title,
                link: image
            }),
        }).then((result) => this._checkErrors(result));
    }

    setLike(item) {
        return fetch(`${this._baseUrl}/cards/likes/${item}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: this._authorization,
            },
        }).then((result) => this._checkErrors(result));
    }

    removeLike(item) {
        return fetch(`${this._baseUrl}/cards/likes/${item}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: this._authorization,
            },
        }).then((result) => this._checkErrors(result));
    }

    removeCard(item) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: this._authorization,
            },
        }).then((result) => this._checkErrors(result));
    }

}

const api = new Api({
    baseUrl: "https://api.mestoapp.nomoredomains.monster",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export default api;
