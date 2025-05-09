import {generateOffers} from './data.js';
import {renderCard} from './card.js';
import {getRandomArrayElem} from './util.js';
import './notice.js';

const mapCanvas = document.querySelector('#map-canvas');
const offers = generateOffers();
const offer = getRandomArrayElem(offers);
mapCanvas.appendChild(renderCard(offer));
