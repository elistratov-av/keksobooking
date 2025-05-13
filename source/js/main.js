import {setLogger} from './api.js';
import {loadOffers, resetMap} from './map.js';
import {setNoticeFormReset, resetNoticePreviews} from './notice.js';

setLogger(console);
setNoticeFormReset(() => {
  resetNoticePreviews();
  resetMap();
});
loadOffers();
