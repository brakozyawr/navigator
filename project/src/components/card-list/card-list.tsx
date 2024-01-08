import cn from 'classnames';
import {TParking} from '../../types/types';
import Card from '../card/card';
import {useEffect} from 'react';
//import { sortByCity, sortByFilter} from '../../store/action';
//import {useAppDispatch} from '../../hooks';


type CardListProps = {
  parkingList:TParking[];
  onListParkingHover?: (listOfferId:string) => void;
  main: boolean;
}

const CardList = ({parkingList, onListParkingHover, main}: CardListProps): JSX.Element => {

  //const dispatch = useAppDispatch();
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

  useEffect(() => {
    //dispatch(sortByCity());
    //dispatch(sortByFilter());
  }, []);

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
