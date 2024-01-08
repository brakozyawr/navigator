import {TParking} from './types/types';
import {Filter} from './const';

export const convertRating = (rating:number) => {
  const widtth = `${Math.round(rating) * 20 }%`;
  return {width: widtth};
};

export const sortParkingList = function(parkingList: TParking[], currentFilter: string): TParking[] {
  const sortedParking = parkingList.slice();
  switch (currentFilter) {
    case Filter.PriceUp:
      sortedParking.sort((a, b) => a.price - b.price);
      break;
    case Filter.PriceDown:
      sortedParking.sort((a, b) => b.price - a.price);
      break;
    case Filter.TopRated:
      sortedParking.sort((a, b) => b.rating - a.rating);
      break;
    case Filter.Popular:
      return sortedParking;
  }
  return sortedParking;
};


