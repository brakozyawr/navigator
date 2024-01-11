import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';
import {TParking} from '../../types/types';
import {convertRating} from '../../util';
import {useAppDispatch} from '../../hooks';
import {setCurrentParkingId} from '../../store/action';
import {deleteParkingAction} from '../../store/api-actions';

type CardProps = {
  parking:TParking;
  onMouseOverHandler: (parking: string) => void;
  main: boolean;
}

const Card = ({parking, onMouseOverHandler, main}: CardProps): JSX.Element =>{
  const className = main ? 'cities' : 'near-places';
  const dispatch = useAppDispatch();

  return(
    <article
      key={parking.id}
      className={`${className}__card place-card`}
      onMouseOver={() => onMouseOverHandler(parking.id)}
    >
      <div className="place-card__info">
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={convertRating(parking.rating)}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"
          onClick={() => {
            dispatch(setCurrentParkingId(parking.id));
          }}
        >
          <Link to={`${AppRoute.Details}${parking.id}`}>{parking.name}</Link>
        </h2>
        <p className="place-card__type"><b>Тип расположения:</b> {parking.type}</p>
        <p className="place-card__type"><b>Доступность:</b> {parking.availability}</p>
        {parking.isConditional && <p className="place-card__type"><b>График платной работы</b> {parking.time}</p>}
        {(parking.isConditional || Boolean(parking.price)) &&
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{parking.price} ₽ </b>
              <span className="place-card__price-text">&#47;&nbsp;час</span>
            </div>
          </div>}
      </div>
      <button
        className="cross-btn"
        type="button"
        title="Удалить элемент"
        aria-label="Закрыть попап"
        onClick={() => {
          dispatch(deleteParkingAction(parking.id));
        }}
      >
        ×
      </button>
    </article>
  );};

export default Card;
