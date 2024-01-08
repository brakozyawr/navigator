import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../../components/header/header';


const NotFound = (): JSX.Element => (
  <div className="page page--gray page--main">
    <Header/>
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">404. Page not found</b>
              <p className="cities__status-description"> <Link to={AppRoute.Root}>Вернуться на главную</Link></p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>
);


export default NotFound;
