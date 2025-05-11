import {isEscPressed} from './util.js';

const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

const isEventOutOfElem = (evt, elem) => {
  return !elem.contains(evt.target);
};

const showErrorTemplate = (errContainer) => {
  const errMessage = errContainer.querySelector('.error__message');
  const errButton = errContainer.querySelector('.error__button');

  const onDocumentKeydown = (evt) => {
    if (isEscPressed(evt)) {
      close();
    }
  };

  const onDocumentClick = (evt) => {
    if (isEventOutOfElem(evt, errMessage) || evt.target === errButton) {
      close();
    }
  };

  const close = () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    errContainer.remove();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(errContainer);
};

const showAlert = (text, button = 'Закрыть') => {
  const errContainer = errorTemplate.querySelector('.error').cloneNode(true);
  const errMessage = errContainer.querySelector('.error__message');
  const errButton = errContainer.querySelector('.error__button');

  errMessage.textContent = text;
  errButton.textContent = button;

  showErrorTemplate(errContainer);
};

const showError = () => {
  const errContainer = errorTemplate.querySelector('.error').cloneNode(true);

  showErrorTemplate(errContainer);
};

const showSuccess = () => {
  const infoContainer = successTemplate.querySelector('.success').cloneNode(true);
  const successMessageElem = infoContainer.querySelector('.success__message');

  const onDocumentKeydown = (evt) => {
    if (isEscPressed(evt)) {
      close();
    }
  };

  const onDocumentClick = (evt) => {
    if (isEventOutOfElem(evt, successMessageElem)) {
      close();
    }
  };

  const close = () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    infoContainer.remove();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(infoContainer);
};

export { showAlert, showError, showSuccess };
