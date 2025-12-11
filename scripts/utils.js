export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function closePopupOnOverlayClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}
