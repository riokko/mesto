class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  async getInitialCards() {
    const response = await fetch(this._url, { headers: this._headers });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

export default Api;
