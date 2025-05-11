import {loadOffers, resetFiltersForm, resetMainPinMarker} from './map.js';
import {setLogger} from './api.js';
import {setNoticeFormReset} from './notice.js';

setLogger(console);
loadOffers();
setNoticeFormReset(() => {
  resetFiltersForm();
  setTimeout(resetMainPinMarker, 0);
});
