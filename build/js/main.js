const headers = document.querySelectorAll('.footer__section-header');
const buttons = document.querySelectorAll('.footer__section-button');
const contents = document.querySelectorAll('.footer__section-content');

if (buttons && contents && buttons.length === contents.length) {
  buttons.forEach((button, index) => {
    button.classList.remove('footer__section-button--nojs');
    contents[index].classList.remove('footer__section-content--nojs');

    headers[index].addEventListener('click', () => {
      if (!button.classList.contains('footer__section-button--open')) {
        const openedButton = document.querySelector('.footer__section-button--open');
        if (openedButton) {
          openedButton.classList.remove('footer__section-button--open');
          document.querySelector('.footer__section-content--open').classList.remove('footer__section-content--open');
        }
      }

      button.classList.toggle('footer__section-button--open');
      contents[index].classList.toggle('footer__section-content--open');
    });
  });
}

const phoneInput = document.querySelectorAll('[name=phone]');

if (phoneInput) {
  // eslint-disable-next-line no-undef
  const im = new Inputmask('+7(999)999-99-99');
  im.mask(phoneInput);
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

const headerLink = document.querySelector('.header__button');
if (headerLink) {
  headerLink.addEventListener('click', (evt) => {
    evt.preventDefault();

    const anchor = headerLink.href.match(/#.*/);
    if (!anchor) {
      return;
    }

    const anchorElm = document.querySelector(anchor[0]);
    if (!anchorElm) {
      return;
    }

    window.scrollTo({
      top: getCoords(anchorElm).top,
      behavior: 'smooth',
    });
  });
}

function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function openModal(element, params = {}) {
  element.classList.add('modal--open');
  document.body.classList.add('page__body--no-scroll');

  function closeModal() {
    element.classList.remove('modal--open');
    document.body.classList.remove('page__body--no-scroll');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onModalEscKeydown);
    // eslint-disable-next-line no-use-before-define
    params.closeButton.removeEventListener('click', onModalClickClose);
    // eslint-disable-next-line no-use-before-define
    element.removeEventListener('click', onModalClickOverlay);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('focusin', onFocus);

    if (params.afterClose) {
      params.afterClose();
    }
  }

  function onFocus(evt) {
    if (!element.contains(evt.target)) {
      element.querySelector('input, button, a').focus();
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
  document.addEventListener('focusin', onFocus);

  return {
    closeModal: closeModal,
  };
}

const openButton = document.querySelector('.header__contacts-button');
const modalWindow = document.querySelector('.modal');
const modalForm = modalWindow.querySelector('.modal__form form');

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
