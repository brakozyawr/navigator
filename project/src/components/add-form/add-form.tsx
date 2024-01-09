//import {useAppDispatch} from '../../hooks';
import './style.css';
import {useEffect, useRef} from 'react';


type AddFormProps = {
  setPopupState: (popupState: boolean) => void;
}

const AddForm = ({setPopupState} : AddFormProps): JSX.Element => {
//const className = main ? 'cities' : 'near-places';
//const dispatch = useAppDispatch();

  const modal = useRef<HTMLDivElement | null >(null);

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setPopupState(false);
      }
    };
    document.addEventListener('keydown', onKeyDownEsc);
    document.body.classList.add('scroll-lock');

    if(modal.current){
      const focusableEls: NodeListOf<HTMLButtonElement> = modal.current.querySelectorAll('button:not([disabled])');
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      const KEYCODE_TAB = 9;
      firstFocusableEl.focus();
      modal.current.addEventListener('keydown', (evt) => {
        const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
          return;
        }

        if ( evt.shiftKey ){
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            evt.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            evt.preventDefault();
          }
        }
      });
    }

    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
      document.body.classList.remove('scroll-lock');
      document.body.focus();
    };

  }, [setPopupState]);

  return (
    <div className="modal is-active ">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => {
            setPopupState(false);
          }}
        />
        <div className="modal__content" ref={modal}>

          <section className="notice">
            <h2 className="notice__title">Добавить парковку</h2>
            <form className="ad-form" method="post" encType="multipart/form-data" autoComplete="off" action="#" noValidate >
              <fieldset className="ad-form__element  ad-form__element--wide validate-element ">
                <label className="ad-form__label" htmlFor="title">Наименование</label>
                <input id="title" name="title" type="text" placeholder="Введите название" minLength={30}
                  maxLength={100} autoFocus required
                />
              </fieldset>
              <fieldset className="ad-form__element ">
                <label className="ad-form__label" htmlFor="address">Адрес </label>
                <input id="address" name="address" type="text" readOnly/>
              </fieldset>
              <fieldset className="ad-form__element ">
                <label className="ad-form__label" htmlFor="location">Координаты</label>
                <input id="location" name="location" type="text" readOnly/>
              </fieldset>
              <fieldset className="ad-form__element validate-element ">
                <label className="ad-form__label" htmlFor="placeMax">Максимальное количество мест</label>
                <input id="placeMax" name="placeMax" type="number" placeholder="0" min="0" max="100000" required />
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="type">Тип расположения транспорта</label>
                <select id="type" name="type">
                  <option value="линейное" selected>линейное</option>
                  <option value="площадное">площадное</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="own">Принадлежность:</label>
                <select id="own" name="own">
                  <option value="муниципальная" selected>муниципальная</option>
                  <option value="частная">частная</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="availability">Доступность:</label>
                <select id="availability" name="availability">
                  <option value="платная" selected>платная</option>
                  <option value="бесплатная">бесплатная</option>
                  <option value="условно бесплатная">условно бесплатная</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element ad-form__element--time validate-element " disabled >
                <label className="ad-form__label" htmlFor="timein">Платная в интервале</label>
                <input id="timein" name="timein" type="time" placeholder="0" min="0" max="100000" required />
                <input id="timeout" name="timeout" type="time" placeholder="0" min="0" max="100000" required />
              </fieldset>
              <fieldset className="ad-form__element validate-element ">
                <label className="ad-form__label" htmlFor="price">Цена за час, руб.</label>
                <input id="price" name="price" type="number" placeholder="0" min="0" max="100000" required />
              </fieldset>
              {/*<fieldset className="ad-form__element features">
                <legend>Удобства: Wi-Fi, кухня, парковка, стиралка, лифт, кондиционер</legend>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature" value="wifi"
                  id="feature-wifi"
                />
                <label className="features__label features__label--wifi" htmlFor="feature-wifi">Wi-Fi</label>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature" value="dishwasher"
                  id="feature-dishwasher"
                />
                <label className="features__label features__label--dishwasher" htmlFor="feature-dishwasher">Посудомоечная
                  машина
                </label>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature" value="parking"
                  id="feature-parking"
                />
                <label className="features__label features__label--parking" htmlFor="feature-parking">Парковка</label>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature" value="washer"
                  id="feature-washer"
                />
                <label className="features__label features__label--washer" htmlFor="feature-washer">Стиральная
                  машина
                </label>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature" value="elevator"
                  id="feature-elevator"
                />
                <label className="features__label features__label--elevator" htmlFor="feature-elevator">Лифт</label>
                <input className="features__checkbox visually-hidden" type="checkbox" name="feature"
                  value="conditioner" id="feature-conditioner"
                />
                <label className="features__label features__label--conditioner"
                  htmlFor="feature-conditioner"
                >Кондиционер
                </label>
              </fieldset>*/}
              <fieldset className="ad-form__element ad-form__element--wide">
                <label className="ad-form__label" htmlFor="description">Описание (не обязательно)</label>
                <textarea id="description" name="description" placeholder="Описание" />
              </fieldset>
              <fieldset className="ad-form__element ad-form__element--submit">
                <button className="ad-form__submit" type="submit">Опубликовать</button>
                 или <button className="ad-form__reset" type="reset"> очистить</button>
              </fieldset>
            </form>
          </section>

          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => {
              setPopupState(false);
            }}
          >
            крестик
          </button>
        </div>
      </div>
    </div>
  );};

export default AddForm;
