class Api {
    constructor(config) {
        this._url = config.url;
        this._token = '0ffb4600-da7b-4a50-ad82-6478aae818d7';
        this._mimeType = config.mimeType || 'application/json';
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
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
        });
        return this._defaultRequestReturn(response);
    }

    async patchUserInfo({ name, about }) {
        const response = await fetch(this._url, {
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
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
        });
        return this._defaultRequestReturn(response);
    }

    async addCard({ name, link }) {
        const response = await fetch(this._url, {
            headers: this._getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name,
                link,
            }),
        });
        return this._defaultRequestReturn(response);
    }
}

export default Api;
