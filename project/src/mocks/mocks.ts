import {v4 as uuidv4} from 'uuid';
import {TLocation, TParking} from '../types/types';

// Результат: целое число из диапазона "от...до"
function getRandomInteger(min: number, max: number) {
  if(max > min && min >= 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Math.abs(min);
}

// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
function getRandomFractionalNumber(min: number, max: number, numberSymbols: number) {
  if(max > min && min >= 0 && numberSymbols >= 0){
    const randomNumber = (Math.random() * (max - min)) + min; //случайное дробное в диапазоне [min, max)
    const cropNumber = randomNumber.toFixed(numberSymbols);

    return parseFloat(cropNumber);
  }
  return Math.abs(min);
}

// получение случайного элемента массива
function getArrayRandomElement (array: string[]) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

//получение случайного true/false
/*function boolean () {
  return getRandomInteger(0, 1);
}*/

const PRICE_MAX = 1000;
const PRICE_MIN = 10;
const RATING_MAX = 5;
const RATING_MIN = 1;
const PLACE_MAX = 1000;
const PLACE_MIN = 10;
const ARRAY_TYPE = ['линейное', 'площадное'];
const ARRAY_OWN = ['муниципальная', 'частная'];
const ARRAY_AVAILABILITY = ['платная', 'бесплатная', 'условно бесплатная'];

const ARRAY_TIME = ['12:00 - 18:00', '13:00 - 21:00', '00:00 - 23:59'];


const LAT_MAX = 53.0651;
const LAT_MIN = 52.8651;
const LNG_MAX = 36.1785;
const LNG_MIN = 35.9785;
const ZOOM = 13;


function createParking (itemNumber: number) {
  const parking = {} as TParking;
  const parkingLocation = {} as TLocation;
  const counter = itemNumber + 1;

  parkingLocation.latitude = getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5);
  parkingLocation.longitude = getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5);
  parkingLocation.zoom = ZOOM;

  //parking.id = uuidv4();
  parking.id = String(counter);
  parking.name = `Парковка ${ counter}`;
  parking.description = 'бла-бла-бла бла-бла бла-бла бла бла-бла-бла бла-бла бла-бла бла-бла-бла бла-бла бла-бла бла-бла-бла бла-бла бла-бла бла-бла-бла бла-бла бла-бла бла бла-бла-бла бла-бла бла-бла';
  parking.address = `Улица Лизюкова-${ counter } ${ counter + 10}`;
  parking.placeMax = getRandomInteger(PLACE_MIN, PLACE_MAX);
  parking.type = getArrayRandomElement(ARRAY_TYPE);
  parking.own = getArrayRandomElement(ARRAY_OWN);
  parking.availability = getArrayRandomElement(ARRAY_AVAILABILITY);
  parking.price = 0;

  if (parking.availability === 'условно бесплатная'){
    parking.isConditional = true;
    parking.time = getArrayRandomElement(ARRAY_TIME);
    parking.price = getRandomInteger(PRICE_MIN, PRICE_MAX);
  }else{
    parking.isConditional = false;
    parking.time = '';
  }

  if(parking.availability === 'платная'){
    parking.price = getRandomInteger(PRICE_MIN, PRICE_MAX);
  }

  parking.rating = getRandomInteger(RATING_MIN, RATING_MAX);
  parking.location = parkingLocation;

  return parking;
}

// фунция для создания массива из объектов-оъявлений
export function createParkingList (elementsCount: number) {
  const parkingArray = [];
  for (let i = 0; i < elementsCount; i++) {
    parkingArray[i] = createParking(i);
  }

  return parkingArray;
}

//console.log(createParkingList(20));


