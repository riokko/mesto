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

    setUserInfo = ({ name, about, avatar, _id }) => {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    };

    getUserId = () => {
        return this._id;
    }
}

export default UserInfo;
