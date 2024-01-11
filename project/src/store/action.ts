import {createAction} from '@reduxjs/toolkit';
import {TParking} from '../types/types';
import {AppRoute, AuthorizationStatus} from '../const';


export const loadParkingList = createAction<TParking[]>('data/loadParkingList');
export const loadParking = createAction<TParking | undefined>('data/loadParking');

export const setParkingListDataLoadingStatus = createAction<boolean>('data/setParkingListDataLoadingStatus');
export const setParkingDataLoadingStatus = createAction<boolean>('data/setParkingDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('card-list/setError');

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
