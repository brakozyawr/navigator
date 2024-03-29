import {useAppDispatch} from '../../hooks';
import './style.css';
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {TParking} from '../../types/types';
import {v4 as uuidv4} from 'uuid';
import {addParkingAction, editParkingAction} from '../../store/api-actions';

type AddFormProps = {
  setPopupState: (popupState: boolean) => void;
  editElement?: TParking;
}

const AddForm = ({setPopupState, editElement} : AddFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
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

  //console.log(editElement);
  const form = useRef<HTMLFormElement | null >(null);
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);
  const [formData, setFormData] = useState({
    name: editElement ? editElement.name : '',
    description: editElement ? editElement.description : '',
    address: editElement ? editElement.address : '',
    latitude: editElement ? editElement.location.latitude : null,
    longitude: editElement ? editElement.location.longitude : null,
    placeMax: editElement ? editElement.placeMax : null,
    type: editElement ? editElement.type : 'линейное',
    own: editElement ? editElement.own : 'муниципальная',
    availability: editElement ? editElement.availability : 'бесплатная',
    isConditional: editElement ? editElement.isConditional : false,
    isPayable: editElement ? (editElement.availability === 'платная') : false,
    time: editElement ? editElement.time : '',
    price: editElement ? editElement.price : null,
    rating: editElement ? editElement.rating : 0,
  });


  useEffect(() => {
    let isDisabled = false;
    const unchangeablePart = Boolean(formData.name && formData.address && formData.latitude && formData.longitude && formData.placeMax);

    if(formData.isConditional){
      isDisabled = Boolean(unchangeablePart && Boolean(formData.time) && formData.price);
    }
    if(formData.isPayable /*&& !formData.isConditional*/ ){
      isDisabled = Boolean(unchangeablePart && formData.price);
    }
    if(!formData.isConditional && !formData.isPayable){
      isDisabled = Boolean(unchangeablePart);
    }

    setDisabledSubmit(!isDisabled);
  }, [formData]);

  const fieldChangeHandle = (evt:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});

    if(name === 'availability' ){
      if(value === 'платная'){
        setFormData({...formData, availability: value, isPayable: true, isConditional: false, time: ''});
      }
      if(value === 'условно бесплатная'){
        setFormData({...formData, availability: value, isConditional: true, isPayable: false});
      }
      if(value === 'бесплатная'){
        setFormData({...formData, availability: value, isConditional: false, isPayable: false, time: '', price: null });
      }
    }
  };


  const onSubmit = (parking: TParking) => {
    editElement ? dispatch(editParkingAction(parking)) : dispatch(addParkingAction(parking));
    setPopupState(false);
  };


  const resetForm = () => {
    if(form.current){
      form.current.reset();
    }
    setFormData({
      name: '',
      description: '',
      address: '',
      latitude: 0,
      longitude: 0,
      placeMax: 0,
      type: 'линейное',
      own: 'муниципальная',
      availability: 'бесплатная',
      isConditional: false,
      isPayable: false,
      time: '',
      price: null,
      rating: 0,
    });
    setDisabledSubmit(true);
  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      id: editElement ? editElement.id : uuidv4(),
      name: formData.name,
      description: formData.description,
      address: formData.address,
      location: {
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        zoom: 12,
      },
      placeMax: Number(formData.placeMax),
      type: formData.type,
      own: formData.own,
      availability: formData.availability,
      //isConditional: formData.availability === 'условно бесплатная',
      isConditional: formData.isConditional ,
      time: formData.time,
      price: Number(formData.price),
      rating: formData.rating,
    });

    resetForm();
  };


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
            <h2 className="notice__title">{editElement ? 'Редактировать информацию о парковке' : 'Добавить парковку'}</h2>
            <form className="ad-form" method="post" encType="multipart/form-data" autoComplete="off" action="#" ref={form}
              onSubmit={handleSubmit}
              onReset={resetForm}
            >
              <fieldset className="ad-form__element  ad-form__element--wide ">
                <label className="ad-form__label" htmlFor="name">Наименование</label>
                <input id="name"
                  name="name"
                  value={formData.name}
                  type="text"
                  placeholder="Введите название"
                  minLength={0}
                  maxLength={100}
                  autoFocus
                  required
                  onChange={fieldChangeHandle}
                />
              </fieldset>
              <fieldset className="ad-form__element ">
                <label className="ad-form__label" htmlFor="address">Адрес </label>
                <input id="address"
                  name="address"
                  value={formData.address}
                  type="text"
                  onChange={fieldChangeHandle}
                  required
                />
              </fieldset>
              <fieldset className="ad-form__element ad-form__element--double">
                <label className="ad-form__label" htmlFor="location">Координаты</label>
                <input id="location"
                  name="latitude"
                  value={String(formData.latitude)}
                  type="number"
                  min={-180}
                  max={180}
                  step="any"
                  placeholder="широта"
                  required
                  onChange={fieldChangeHandle}
                />
                <input
                  name="longitude"
                  value={String(formData.longitude)}
                  type="number"
                  min={-180}
                  max={180}
                  step="any"
                  placeholder="долгота"
                  required
                  onChange={fieldChangeHandle}
                />
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="placeMax">Максимальное количество мест</label>
                <input id="placeMax"
                  name="placeMax"
                  value={String(formData.placeMax)}
                  type="number"
                  min="0"
                  max="100000"
                  onChange={fieldChangeHandle}
                  required
                />
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="type">Тип расположения транспорта</label>
                <select id="type" name="type" onChange={fieldChangeHandle} value={formData.type}>
                  <option value="линейное">линейное</option>
                  <option value="площадное">площадное</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="own">Принадлежность:</label>
                <select id="own" name="own" onChange={fieldChangeHandle} value={formData.own}>
                  <option value="муниципальная" >муниципальная</option>
                  <option value="частная">частная</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="availability">Доступность:</label>
                <select id="availability" name="availability" onChange={fieldChangeHandle} value={formData.availability}>
                  <option value="бесплатная">бесплатная</option>
                  <option value="платная" >платная</option>
                  <option value="условно бесплатная">условно бесплатная</option>
                </select>
              </fieldset>
              <fieldset className="ad-form__element" disabled={!formData.isConditional}>
                <label className="ad-form__label" htmlFor="time">График платной работы</label>
                <input id="time"
                  name="time"
                  value={formData.time}
                  type="text"
                  placeholder="например, сб, вс"
                  min="0"
                  max="100000"
                  required={formData.isConditional}
                  onChange={fieldChangeHandle}
                />
              </fieldset>
              <fieldset className="ad-form__element" disabled={!(formData.isPayable || formData.isConditional)}>
                <label className="ad-form__label" htmlFor="price">Цена за час, руб.</label>
                <input id="price"
                  name="price"
                  value={String(formData.price)}
                  type="number"
                  //placeholder="0"
                  min="0"
                  max="100000"
                  required={formData.isPayable || formData.isConditional}
                  onChange={fieldChangeHandle}
                />
              </fieldset>
              <fieldset className="ad-form__element ad-form__element--wide">
                <label className="ad-form__label" htmlFor="description">Описание (не обязательно)</label>
                <textarea id="description"
                  name="description"
                  value={formData.description}
                  placeholder="Описание"
                  onChange={fieldChangeHandle}
                />
              </fieldset>
              <fieldset className="ad-form__element ad-form__element--submit">
                <button className="ad-form__submit" type="submit" disabled={isDisabledSubmit}>Опубликовать</button>
                 или
                <button className="ad-form__reset" type="reset"> очистить</button>
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
            ×
          </button>
        </div>
      </div>
    </div>
  );};

export default AddForm;
