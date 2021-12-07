const pageHeader = document.querySelector('.header__nav');
const headerToggle = document.querySelector('.header__toggle');
const headerText = document.querySelector('.header__text');

if (pageHeader) {
  pageHeader.classList.remove('header__nav--nojs');
}
if (headerText) {
  headerText.classList.remove('header__text--nojs');
}

if (headerToggle) {
  headerToggle.addEventListener('click', () => {
    pageHeader.classList.toggle('header__nav--open');
    document.body.classList.toggle('page__body--no-scroll');
  });
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

const menuLinks = document.querySelectorAll('.header__menu-link');
if (menuLinks) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (pageHeader) {
        pageHeader.classList.remove('header__nav--open');
        document.body.classList.remove('page__body--no-scroll');
      }

      const anchor = menuLink.href.match(/#.*/);
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
  });
}
