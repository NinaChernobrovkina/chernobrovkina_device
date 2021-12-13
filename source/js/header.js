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
