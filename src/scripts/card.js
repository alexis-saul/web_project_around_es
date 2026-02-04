export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    currentUserId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._ownerId = data.owner;

    this._currentUserId = currentUserId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._title = this._element.querySelector(".card__title");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }

  updateLike(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__like-button_is-active", isLiked);
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
