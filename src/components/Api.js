class Api {
    constructor({token, url }) {
        this._token = token;
        this._baseUrl = url;
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

    async removeCard(cardId) {
        const response = await fetch(`${this._baseUrl}cards/${cardId}`, {
            headers: this._getHeaders(),
            method: 'DELETE',
        });
        return this._defaultRequestReturn(response);
    }

    async like(cardId, method) {
        const response = await fetch(`${this._baseUrl}cards/likes/${cardId}`, {
            headers: this._getHeaders(),
            method: method,
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
}

export default Api;
