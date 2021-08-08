import React from 'react';


export const BASE_URL = 'https://api.mestoapp.nomoredomains.monster';

const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => checkResponse(res))
        .then((res) => {
            return res;
        })
};

export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => checkResponse(res))
        .then((res) => {
            return res;
        })
};

export const checkData = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => checkResponse(res))
        .then((res) => {
            return res;
        })
};
