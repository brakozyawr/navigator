import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {
  loadParkingList,
  requireAuthorization,
  setParkingListDataLoadingStatus,
  setError,
  redirectToRoute,
  loadParking,
  setParkingDataLoadingStatus
} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, AppRoute} from '../const';
import {AuthData, TParking, UserData} from '../types/types';
import {store} from './';
import {createParkingList} from '../mocks/mocks';


export const clearErrorAction = createAsyncThunk(
  'card-list/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


//если бы мы ходили за списком карточек на сервер
/*export const fetchParkingListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchParkingList',
  async (_arg, { dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<TCard[]>(APIRoute.Main);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
    //dispatch(sortByCity());
  },
);*/


function useLocalStorage(){
  let saved = localStorage.getItem('parkingList');

  if(saved){
    return JSON.parse(saved) as TParking[];
  }else{
    const parkingList: TParking[] = createParkingList(20);
    localStorage.setItem('parkingList', JSON.stringify(parkingList));
    saved = localStorage.getItem('parkingList') as string;
    return JSON.parse(saved) as TParking[];
  }
}

export const fetchParkingListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchParkingList',
  (_arg, { dispatch, extra: api}) => {
    dispatch(setParkingListDataLoadingStatus(true));
    const data = useLocalStorage();
    dispatch(setParkingListDataLoadingStatus(false));
    dispatch(loadParkingList(data));
  },
);

//если бы мы ходили за детальной карточкой на сервер
/*export const fetchParkingAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchParking',
  async (id, {dispatch, extra: api}) => {
    dispatch(setParkingDataLoadingStatus(true));
    const {data} = await api.get<TParking>(`${APIRoute.Room}${id}`);
    dispatch(setParkingDataLoadingStatus(false));
    dispatch(loadParking(data));
  },
);*/

export const fetchParkingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchParking',
  (id, {dispatch, extra: api}) => {
    dispatch(setParkingDataLoadingStatus(true));
    const data = useLocalStorage().find((item) => item.id === id);
    dispatch(loadParking(data));
    dispatch(setParkingDataLoadingStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const addParkingAction = createAsyncThunk<void, TParking, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addParking',
  (parking, {dispatch, extra: api}) => {
    const parkingList = useLocalStorage();
    parkingList.unshift(parking);
    localStorage.setItem('parkingList', JSON.stringify(parkingList));

    const data = useLocalStorage();
    dispatch(loadParkingList(data));
  },
);

export const deleteParkingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteParking',
  (id, {dispatch, extra: api}) => {
    const parkingList = useLocalStorage();
    const deleteElementIndex = parkingList.findIndex ((item) => item.id === id);
    parkingList.splice(deleteElementIndex, 1);
    localStorage.setItem('parkingList', JSON.stringify(parkingList));

    const data = useLocalStorage();
    dispatch(loadParkingList(data));
  },
);

export const editParkingAction = createAsyncThunk<void, TParking, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/editParking',
  (editElement, {dispatch, extra: api}) => {
    const parkingList = useLocalStorage();

    const editElementIndex = parkingList.findIndex ((item) => item.id === editElement.id);
    parkingList.splice(editElementIndex, 1);
    parkingList.unshift(editElement);
    localStorage.setItem('parkingList', JSON.stringify(parkingList));

    const data = useLocalStorage();
    dispatch(loadParkingList(data));
  },
);


