export enum AppRoute {
  Login = '/login',
  Details = '/parking/',
  Root = '/'
}

export enum Filter {
  Popular = 'Popular',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  TopRated = 'Top rated first'
}

export const FILTERS = Object.values(Filter);

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

/*
export const CITY: TCities = {
  Paris: {
    latitude: 48.8534100,
    longitude: 2.3488000,
    zoom: 12,
  },
  Cologne: {
    latitude: 50.9333300,
    longitude: 6.9500000,
    zoom: 12,
  },
  Brussels: {
    latitude: 50.8504500,
    longitude: 4.3487800,
    zoom: 12,
  },
  Amsterdam:{
    latitude: 52.3740300,
    longitude: 4.8896900,
    zoom: 12,
  },
  Hamburg: {
    latitude: 53.5753200,
    longitude: 10.0153400,
    zoom: 12,
  },
  Dusseldorf: {
    latitude: 51.2217200,
    longitude: 6.7761600,
    zoom: 12,
  }
};

export const CITIES = Object.keys(CITY);

export const INITITIAL_CITY = 'Paris';
export const INITIAL_SORT = 'Popular';*/

export const URL_MARKER_DEFAULT = '../img/pin.svg';
export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const TIMEOUT_SHOW_ERROR = 7000;

export const REVIEWS_MAX_COUNT = 10;

export enum APIRoute {
  Main = '/hotels',
  Room = '/hotels/',
  Near = '/hotels/',
  Login = '/login',
  Logout = '/logout',
  Review = '/comments/',
  Comment = '/comments/'
}

export const MAX_IMAGES_COUNT_IN_OFFER = 6;
export const MAX_NEAR_OFFERS = 3;
