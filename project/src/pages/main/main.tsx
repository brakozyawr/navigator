import React, {useState} from 'react';

//import {CITY} from '../../const';
import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';
import MainEmpty from '../main-empty/main-empty';
import AddForm from '../../components/add-form/add-form';


function Main(): JSX.Element {

  //const {offerListSortedByCity, city, offerListSortedByFilter} = useAppSelector((state) => state);
  const {parkingList, authorizationStatus} = useAppSelector((state) => state);
  const [selectedPoint, setSelectedPoint] = useState(' ');
  const [popupState, setPopupState] = useState(false);
  console.log(authorizationStatus);
  const onListParkingHover = (parkingId:string) :void =>{
    setSelectedPoint(parkingId);
  };

  if (parkingList.length === 0) {
    return <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      {authorizationStatus &&
        <div className="container">
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              setPopupState(true);
            }}
          >Добавить парковку
          </button>
        </div>}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Parking</h2>
              <b className="places__found">{parkingList.length} мест для парковки </b>
              <CardList
                parkingList={parkingList}
                onListParkingHover={onListParkingHover}
                main
              />
            </section>
            <div className="cities__right-section">
              <Map
                //selectedCity={CITY[city]}
                points={parkingList}
                selectedPoint={selectedPoint}
                main
              />
            </div>
          </div>
        </div>
      </main>
      {popupState && <AddForm setPopupState={setPopupState} />}
    </div>
  );
}

export default Main;
