class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo = () => {
    return {
      name: this._name,
      profession: this._about,
    };
  };

  setUserInfo = (data) => {
    this._name.textContent = data.name;
    this._about.textContent = data.profession;
  };
}

export default UserInfo;
