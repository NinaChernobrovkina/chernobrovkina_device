const phoneInput = document.querySelectorAll('[name=phone]');

if (phoneInput) {
  // eslint-disable-next-line no-undef
  const im = new Inputmask('+7(999)999-99-99');
  im.mask(phoneInput);
}
