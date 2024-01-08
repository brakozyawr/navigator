export type TParking = {
  id: string;
  name: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  placeMax: number;
  type: string;
  own: string;
  availability: string;
  isConditional: boolean;
  time: string;
  price: number;
  rating: number;
}

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TCity = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCities = {
  [propertyName: string]: TCity;
};

export type TReview ={
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}

export type TComment ={
  comment: string;
  rating: number;
  id: string;
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};


