import {setLogger} from './api.js';
import {loadOffers, resetMap} from './map.js';
import {setNoticeFormReset} from './notice.js';

setLogger(console);
setNoticeFormReset(() => {
  resetMap();
});
loadOffers();
