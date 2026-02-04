export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      _id: this._id,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._jobElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
    if (_id) this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
