import {useRef, FormEvent} from 'react';
import {Link, Navigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/types';
import {AppRoute, AuthorizationStatus} from '../../const';


const Login = (): JSX.Element => {
  const {authorizationStatus} = useAppSelector((state) => state);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {

      const formatEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
      const formatPassword = /[0-9]+[А-ЯA-Z]+$/i;
      const validEmail = formatEmail.test(loginRef.current.value);
      const validPassword = formatPassword.test(passwordRef.current.value);

      if(validEmail && validPassword) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };

  if (isAuthorized ){
    return <Navigate to={AppRoute.Root} />;
  }

  return(
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <p>Парковка :)</p>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} autoComplete="off">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email, любой вида a@b.cc" ref={loginRef} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Пароль</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Пароль: буквы и цифры" ref={passwordRef} required/>
              </div>
              <button className="login__submit form__submit button" type="submit" >Sign in</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
