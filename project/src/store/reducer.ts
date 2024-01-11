import {createReducer} from '@reduxjs/toolkit';
import {
  loadParkingList,
  requireAuthorization,
  setParkingListDataLoadingStatus,
  setError,
  loadParking,
  setParkingDataLoadingStatus,
} from './action';
import {AuthorizationStatus} from '../const';
import {TParking} from '../types/types';


type TInitialState = {
  parkingList: TParking[];
  currentParking: TParking | undefined;
  authorizationStatus: AuthorizationStatus;
  isParkingListDataLoading: boolean;
  isParkingDataLoading: boolean;
  error: string | null;
}

const initialState:TInitialState = {
  parkingList: [],
  currentParking: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  isParkingListDataLoading: false,
  isParkingDataLoading: false,
  error: null,
};


const reducer = createReducer(initialState, (builder) => {

  builder
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
