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
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<TCard[]>(APIRoute.Main);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
    //dispatch(sortByCity());
  },
);*/

const parkingList: TParking[] = createParkingList(20);


localStorage.setItem('parkingList', JSON.stringify(parkingList));
const saved = localStorage.getItem('parkingList');
const initialValue = JSON.parse(saved);

export const fetchParkingListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  (_arg, { dispatch, extra: api}) => {
    dispatch(setParkingListDataLoadingStatus(true));
    const data = parkingList;
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
  'data/fetchOffer',
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
  'data/fetchOffer',
  (id, {dispatch, extra: api}) => {
    dispatch(setParkingDataLoadingStatus(true));
    const data = parkingList.find((item) => item.id === id);
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

/*export const addCommentAction = createAsyncThunk<void, TComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addComment',
  async ({comment,rating, id}, {dispatch, extra: api}) => {
    await api.post<TComment>(`${APIRoute.Comment}${id}`, {comment, rating});
    const {data} = await api.get<TReview[]>(`${APIRoute.Comment}${id}`);
    dispatch(loadReviews(data));
  },
);*/
