import {createReducer} from '@reduxjs/toolkit';
import {
  // selectionCity,
  // sortByCity,
  // selectionFilter,
  // sortByFilter,
  loadParkingList,
  requireAuthorization,
  setParkingListDataLoadingStatus,
  setError,
  loadParking,
  setCurrentParkingId,
  setParkingDataLoadingStatus,
} from './action';
import {AuthorizationStatus} from '../const';
import {TParking} from '../types/types';
// import {sortOffers} from '../util';


type TInitialState = {
  parkingList: TParking[];
  currentParking: TParking | undefined;
  currentParkingId: string;
  //offerListSortedByCity: TParking[];
  //offerListSortedByFilter: TParking[];
  //currentFilter: string;
  authorizationStatus: AuthorizationStatus;
  isParkingListDataLoading: boolean;
  isParkingDataLoading: boolean;
  error: string | null;
}

const initialState:TInitialState = {
  parkingList: [],
  currentParking: undefined,
  currentParkingId: ' ',
  //offerListSortedByCity: [],
  //offerListSortedByFilter: [],
  //currentFilter: INITIAL_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isParkingListDataLoading: false,
  isParkingDataLoading: false,
  error: null,
};


const reducer = createReducer(initialState, (builder) => {

  builder
  /*.addCase(selectionCity, (state, action) => {
      state.city = action.payload;
    })*/
  /*.addCase(sortByCity, (state) => {
      state.offerListSortedByCity = state.offerList.filter((card) =>
        card.city.name === state.city
      );
    })*/
  /*.addCase(selectionFilter, (state, action) => {
      state.currentFilter = action.payload;
    })*/
    /*.addCase(sortByFilter, (state) => {
      state.offerListSortedByFilter = sortOffers(state.offerListSortedByCity, state.currentFilter);
    })*/
    .addCase(setCurrentParkingId, (state, action) => {
      state.currentParkingId = action.payload;
    })
    .addCase(loadParkingList, (state, action) => {
      state.parkingList = action.payload;
    })
    .addCase(loadParking, (state, action) => {
      state.currentParking = action.payload;
    })
    .addCase(setParkingListDataLoadingStatus, (state, action) => {
      state.isParkingListDataLoading = action.payload;
    })
    .addCase(setParkingDataLoadingStatus, (state, action) => {
      state.isParkingDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });

});

export {reducer};
