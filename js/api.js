import {HttpError} from './http-error.js';

const VERBOSE = true;
const BASE_URL = 'https://23.javascript.htmlacademy.pro/keksobooking';

const noop = () => {};
const defaultLogger = {
  log: noop,
  error: noop,
};
let logger = defaultLogger;
const setLogger = (obj) => {
  logger = obj && typeof obj === 'object' ? obj : defaultLogger;
};

const getOffers = () => {
  return get('/data', null, 'Ошибка при получении списка предложений: ')
    .then(response => response.json());
};

const publishOffer = (body) => {
  return post('/', body, 'Ошибка при публикации предложения: ');
};

const post = (path, body = null, errorText = 'Ошибка при выполнении post-запроса: ', verbose = VERBOSE) => {
  return sendRequest('POST', path, body, errorText, verbose);
};

const get = (path, body = null, errorText = 'Ошибка при выполнении get-запроса: ', verbose = VERBOSE) => {
  return sendRequest('GET', path, body, errorText, verbose);
};

const sendRequest = (method, path, body = null, errorText = 'Ошибка при выполнении запроса: ', verbose = VERBOSE) => {
  const url = BASE_URL + path;
  if (verbose) {
    logger.log('Отправляю запрос:', {url, method, body});
  }

  return fetch(url,
    {
      method: method,
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        if (verbose) {
          logger.log('Результат обработки запроса: код состояния - ', response.status, ', тип содержимого: ', response.headers.get('Content-Type'));
        }

        return response;
      }

      const contentType = response.headers.get('Content-Type') || '';
      if (!contentType.includes('application/json')) {
        const err = new HttpError(errorText + response.statusText, response.status);
        if (verbose) {
          logger.error('Исключение:', err);
        }
        throw err;
      }

      const err = new HttpError(errorText + JSON.stringify(response.json()), response.status);
      if (verbose) {
        logger.error('Исключение:', err);
      }
      throw err;
    });
};

export { setLogger, getOffers, publishOffer };
