import cn from 'classnames';
import {TParking} from '../../types/types';
import Card from '../card/card';


type CardListProps = {
  parkingList:TParking[];
  onListParkingHover?: (listOfferId:string) => void;
  main: boolean;
}

const CardList = ({parkingList, onListParkingHover, main}: CardListProps): JSX.Element => {

  const className = cn(
    'places__list',
    {'cities__places-list': main,
      'tabs__content': main,
      'near-places__list': !main,
    }
  );

  const onMouseOverHandler = (id:string): void => {
    if(onListParkingHover){
      onListParkingHover(id);
    }
  };

  return (
    <div className={className}>
      {parkingList.map((parking: TParking) =>
        (
          <Card
            onMouseOverHandler={onMouseOverHandler}
            key={parking.id}
            parking={parking}
            main={main}
          />
        ))}
    </div>
  );
};

export default CardList;
