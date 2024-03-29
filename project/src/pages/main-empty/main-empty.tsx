import Header from '../../components/header/header';
import React from 'react';


const MainEmpty = (): JSX.Element => (
  <div className="page page--gray page--main">
    <Header/>
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">К сожалению, в этой глуши не нашлось ни единой парковки</b>
              <p className="cities__status-description">придется вашей ласточке ночевать в чистом поле :( </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>
);
export default MainEmpty;
