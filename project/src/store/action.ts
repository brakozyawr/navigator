import {createAction} from '@reduxjs/toolkit';
import {TParking} from '../types/types';
import {AppRoute, AuthorizationStatus} from '../const';


/*export const selectionCity = createAction('card-list/selectionCity',
  (value: string) => ({
    payload: value,
  })
);*/

//export const sortByCity = createAction('card-list/filterByCity');

/*export const selectionFilter = createAction('card-list/selectionFilter',
  (value: string) => ({
    payload: value,
  })
);*/

//export const sortByFilter = createAction('card-list/sortByFilter');

export const setCurrentParkingId = createAction('data/setCurrentParkingId',
  (value: string) => ({
    payload: value,
  })
);

export const loadParkingList = createAction<TParking[]>('data/loadOffers');
export const loadParking = createAction<TParking | undefined>('data/loadOffer');

export const setParkingListDataLoadingStatus = createAction<boolean>('data/setParkingListDataLoadingStatus');
export const setParkingDataLoadingStatus = createAction<boolean>('data/setParkingDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('card-list/setError');

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
