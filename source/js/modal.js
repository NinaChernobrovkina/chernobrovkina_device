function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function openModal(element, params = {}) {
  element.classList.add('modal--open');

  function closeModal() {
    element.classList.remove('modal--open');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onModalEscKeydown);
    // eslint-disable-next-line no-use-before-define
    params.closeButton.removeEventListener('click', onModalClickClose);
    // eslint-disable-next-line no-use-before-define
    element.removeEventListener('click', onModalClickOverlay);
    if (params.afterClose) {
      params.afterClose();
    }
  }

  function onModalEscKeydown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onModalClickClose() {
    closeModal();
  }

  function onModalClickOverlay(evt) {
    if (evt.target === element) {
      closeModal();
    }
  }

  document.addEventListener('keydown', onModalEscKeydown);
  params.closeButton.addEventListener('click', onModalClickClose);
  element.addEventListener('click', onModalClickOverlay);

  return {
    closeModal: closeModal,
  };
}

const openButton = document.querySelector('.header__contacts-button');
const modalWindow = document.querySelector('.modal');
const modalForm = modalWindow.querySelector('.modal__form');

if (openButton && modalWindow && modalForm) {
  openButton.addEventListener('click', () => {
    openModal(modalWindow, {
      closeButton: modalWindow.querySelector('.modal__close'),
    });
    modalForm.name.focus();
  });
}

function onInput(evt) {
  localStorage.setItem(evt.currentTarget.name, evt.currentTarget.value);
}

modalForm.name.addEventListener('input', onInput);
modalForm.phone.addEventListener('input', onInput);
modalForm.question.addEventListener('input', onInput);

modalForm.querySelectorAll('input, textarea').forEach((input) => {
  const value = localStorage.getItem(input.name);
  if (value) {
    input.value = value;
  }
});
