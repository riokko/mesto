class Api {
    constructor(config) {
        this._url = config.url;
        this._token = '0ffb4600-da7b-4a50-ad82-6478aae818d7';
        this._mimeType = config.mimeType || 'application/json';
        this._method = config.method || 'GET';
    }

    _getHeaders() {
        return { 'Content-Type': this._mimeType, authorization: this._token };
    }

    async getUserInfo() {
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
            method: this._method,
        });
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    async patchUserInfo({ name, about }) {
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
            method: this._method,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        });
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    async getInitialCards() {
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
            method: this._method,
        });
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    async addCard() {
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
            method: 'POST',
        });
    }
}

export default Api;
