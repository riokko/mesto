class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo = () => {
    return {
      name: this._name,
      profession: this._about,
    };
  };

  setUserInfo = (data) => {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  };
}

export default UserInfo;
