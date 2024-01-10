import {Routes, Route} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import CardDetails from '../../pages/card-details/card-details';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';


const App = (): JSX.Element => {

  const {isParkingListDataLoading, authorizationStatus} = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown || isParkingListDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route
            index
            element={<Main />}
          />
          <Route
            path={AppRoute.Login}
            element={<Login/>}
          />
          <Route
            path={`${AppRoute.Details}:id`}
            element={<CardDetails/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
