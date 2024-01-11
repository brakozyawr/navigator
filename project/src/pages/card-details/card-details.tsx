import Map from '../../components/map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Header from '../../components/header/header';
import {convertRating} from '../../util';
import React, {useEffect, useState} from 'react';
import NotFound from '../not-found/not-found';
import {deleteParkingAction, fetchParkingAction} from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import {loadParking} from '../../store/action';
import {Link, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import AddForm from '../../components/add-form/add-form';


const CardDetails = (): JSX.Element => {
  const {currentParking, isParkingDataLoading, authorizationStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchParkingAction(params.id));
    }
    return () => {
      dispatch(loadParking(undefined));
    };
  }, [params.id]);

  if (!currentParking && isParkingDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return !currentParking ? <NotFound/> : (
    <div className="page">
      <Header/>
      {authorizationStatus === AuthorizationStatus.Auth &&
        <div className="container">
          <Link to={AppRoute.Root}
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              dispatch(deleteParkingAction(currentParking.id));
            }}
          >Удалить
          </Link>
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              setPopupState(true);
            }}
          >Редактировать
          </button>
        </div>}
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentParking.name}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={convertRating(currentParking.rating)}/>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <ul className="property__features">
                <li className="property__feature ">
                  <b>Адрес:</b> {currentParking.address}
                </li>
                <li className="property__feature ">
                  <b>Координаты:</b> {currentParking.location.latitude}, {currentParking.location.longitude}
                </li>
                <li className="property__feature ">
                  <b>Тип расположения транспорта:</b> {currentParking.type}
                </li>
                <li className="property__feature ">
                  <b>Максимальное количество мест:</b> {currentParking.placeMax}
                </li>
                <li className="property__feature ">
                  <b>Принадлежность:</b> {currentParking.own}
                </li>
                <li className="property__feature ">
                  <b>Доступность:</b> {currentParking.availability}
                </li>
                {currentParking.isConditional &&
                  <li className="property__feature ">
                    <b>График платной работы:</b> {currentParking.time}
                  </li>}
              </ul>
              {Boolean(currentParking.price) &&
                <div className="property__price">
                  <b className="property__price-value">₽ {currentParking.price}</b>
                  <span className="property__price-text"> &nbsp;час</span>
                </div>}
              <div className="property__host">
                {currentParking.description && <h2 className="property__host-title">Описание</h2>}
                <div className="property__description">
                  <p className="property__text">
                    {currentParking.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Map
            currentParkingLocation={currentParking.location}
            points={[currentParking]}
            main={false}
          />
        </section>
      </main>
      {popupState && <AddForm setPopupState={setPopupState} editElement={currentParking} />}
    </div>
  );
};

export default CardDetails;
