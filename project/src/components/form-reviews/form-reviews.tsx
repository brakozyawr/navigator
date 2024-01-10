import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {TComment} from '../../types/types';
//import {addCommentAction} from '../../store/api-actions';
import {/*useAppDispatch,*/ useAppSelector} from '../../hooks';


const FormReviews = (): JSX.Element => {

  const {currentParkingId} = useAppSelector((state) => state);
  //const dispatch = useAppDispatch();
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);

  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });

  const form = useRef<HTMLFormElement | null >(null);

  const fieldChangeHandle = (evt:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});

    const isDisabled = formData.rating && formData.comment.length > 40 && formData.comment.length < 300;
    setDisabledSubmit(!isDisabled);
  };

  const onSubmit = (CommentData: TComment) => {
    //dispatch(addCommentAction(CommentData));
  };

  const resetForm = () => {
    if(form.current){
      form.current.reset();
    }
    setFormData({
      rating: '',
      comment: '',
    });
    setDisabledSubmit(true);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.rating && formData.comment) {
      onSubmit({
        rating: Number(formData.rating),
        comment: formData.comment,
        id: currentParkingId,
      });
    }

    resetForm();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit} ref={form}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          onChange={fieldChangeHandle}
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={fieldChangeHandle}
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={fieldChangeHandle}
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={fieldChangeHandle}
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={fieldChangeHandle}
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        onChange={fieldChangeHandle}
        value={formData.comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledSubmit}>Submit</button>
      </div>
    </form>
  );};

export default FormReviews;
