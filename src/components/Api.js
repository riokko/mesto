class Api {
    constructor(config) {
        this._token = config.token;
        this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-15/';
        this._mimeType = 'application/json';
    }

    _getHeaders() {
        return { 'Content-Type': this._mimeType, authorization: this._token };
    }

    _defaultRequestReturn(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    async getUserInfo() {
        const response = await fetch(`${this._baseUrl}users/me/`, {
            headers: this._getHeaders(),
        });
        return this._defaultRequestReturn(response);
    }

    async patchUserInfo({ name, about }) {
        const response = await fetch(`${this._baseUrl}users/me/`, {
            headers: this._getHeaders(),
            method: 'PATCH',
            body: JSON.stringify({
                name,
                about,
            }),
        });
        return this._defaultRequestReturn(response);
    }

    async getInitialCards() {
        const response = await fetch(`${this._baseUrl}cards/`, {
            headers: this._getHeaders(),
        });
        return this._defaultRequestReturn(response);
    }

    async addCard({ name, link }) {
        const response = await fetch(`${this._baseUrl}cards/`, {
            headers: this._getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name,
                link,
            }),
        });
        return this._defaultRequestReturn(response);
    }

    async removeCard(url) {
        const response = await fetch(url, {
            headers: this._getHeaders(),
            method: 'DELETE',
        });
        return this._defaultRequestReturn(response);
    }

    async editAvatar(avatar) {
        const response = await fetch(`${this._baseUrl}users/me/avatar`, {
            headers: this._getHeaders(),
            method: 'PATCH',
            body: JSON.stringify({ avatar }),
        });
        if (response.ok && response.status === 200) {
            return response.json();
        } else {
            throw await response.json();
        }
    }

    async like(url, method) {
        const response = await fetch(url, {
            headers: this._getHeaders(),
            method: method,
        });
        return this._defaultRequestReturn(response);
    }
}

export default Api;
