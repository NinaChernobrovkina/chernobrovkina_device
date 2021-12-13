const buttons = document.querySelectorAll('.footer__section-button');
const contents = document.querySelectorAll('.footer__section-content');

if (buttons && contents && buttons.length === contents.length) {
  buttons.forEach((button, index) => {
    button.classList.remove('footer__section-button--nojs');
    contents[index].classList.remove('footer__section-content--nojs');

    button.addEventListener('click', () => {
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
