import { ChangeEvent, createRef, FormEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { ratingNames } from '../../settings/rating-names';
import { commentPostAction, fetchCommentsByID } from '../../store/api-actions';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import { getGuitarByID } from '../../store/selectors';
import { CommentPostType } from '../../types/comment-post-type';
import './review-form.css';

const starsValues = [
  {
    value: 5,
    title: ratingNames[5],
  },
  {
    value: 4,
    title: ratingNames[3],
  },
  {
    value: 3,
    title: ratingNames[3],
  },
  {
    value: 2,
    title: ratingNames[2],
  },
  {
    value: 1,
    title: ratingNames[1],
  },
];

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const currentId = Number(id);

  const guitar = useAppSelector(getGuitarByID);

  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | undefined>('');
  const starInputRefs = starsValues.map(() => createRef<HTMLInputElement>());
  const [rating, setRating] = useState(0);
  const advantageRef = useRef<HTMLInputElement>(null);
  const [advantage, setAdvantage] = useState<string | undefined>('');
  const disAdvantageRef = useRef<HTMLInputElement>(null);
  const [disAdvantage, setDisAdvantage] = useState<string | undefined>('');
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  const [commentText, setCommentText] = useState<string | undefined>('');
  const [isSubmitBtnPushed, setSubmitBtnStatus] = useState(false);

  const stars: HTMLInputElement[] = Array.from(document.querySelectorAll('.rate input'));
  const [focusedStarIndex, setFocusedStarIndex] = useState<number | null>(null);
  const [isFocusOnStars, setFocusOnStarsStatus] = useState(false);

  const handleNameInput = () => {
    setName(nameRef.current?.value);
  };

  const handleAdvantageInput = () => {
    setAdvantage(advantageRef.current?.value);
  };

  const handleDisAdvantageInput = () => {
    setDisAdvantage(disAdvantageRef.current?.value);
  };

  const handleCommentTextInput = () => {
    setCommentText(commentTextRef.current?.value);
  };

  const handleStarsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    setRating(value);
    setFocusedStarIndex(value - 1);
  };

  const createNewComment = ():CommentPostType => ({
    guitarId: guitar?.id || 0,
    userName: nameRef.current?.value || '',
    advantage: advantageRef.current?.value || '',
    disadvantage: disAdvantageRef.current?.value || '',
    comment:  commentTextRef.current?.value || '',
    rating: rating,
  });

  const checkValidation = () => {
    if (name !== '' && advantage !== '' && disAdvantage !== '' && commentText !== '' && rating !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitBtnStatus(true);
    if (checkValidation()) {
      const newComment = createNewComment();
      dispatch(commentPostAction(newComment))
        .then(() => dispatch(fetchCommentsByID(currentId)))
        .then(() => dispatch(changeActiveModal(ActiveModal.ReviewSuccess)));
    }
  };

  const handleCloseModal = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
  };

  //далее страшный велосипедище для фикса инверсии звезд
  const handleOnArrowDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'ArrowLeft') {
      evt.preventDefault();
      if (focusedStarIndex !== null) {
        if (focusedStarIndex === 4 || focusedStarIndex === 5) {
          stars[0].focus();
          stars[0].click();
          setFocusedStarIndex(0);
        } else {
          stars[focusedStarIndex + 1].focus();
          stars[focusedStarIndex + 1].click();
          setFocusedStarIndex(focusedStarIndex + 1);
        }
      }
    }

    if (evt.key === 'ArrowRight') {
      evt.preventDefault();
      if (focusedStarIndex !== null) {
        if (focusedStarIndex === 0) {
          stars[4].focus();
          stars[4].click();
          setFocusedStarIndex(4);
        } else {
          stars[focusedStarIndex - 1].focus();
          stars[focusedStarIndex - 1].click();
          setFocusedStarIndex(focusedStarIndex - 1);
        }
      }
    }
  }, [focusedStarIndex, stars]);

  useEffect(() => {
    if (isFocusOnStars) {
      document.removeEventListener('keydown', handleOnArrowDown);
      document.addEventListener('keydown', handleOnArrowDown);
    }
    if (!isFocusOnStars) {
      document.removeEventListener('keydown', handleOnArrowDown);
    }
    return () => document.removeEventListener('keydown', handleOnArrowDown);
  }, [handleOnArrowDown, isFocusOnStars]);

  const handleOnFocusStars = () => {
    setFocusOnStarsStatus(true);
    if (focusedStarIndex === null) {
      setFocusedStarIndex(5);//индекс перед началом
    }
    document.addEventListener('keydown', handleOnArrowDown);
  };

  const handleOnBlurStars = () => {
    setFocusOnStarsStatus(false);
  };

  return (
    <div className="review-form-container" data-testid="review-form-container">
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} data-testid="overlay"></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase" data-testid="guitar-name">{guitar?.name}</h3>
            <form
              className="form-review"
              onSubmit={handleReviewSubmit}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" ref={nameRef} onInput={handleNameInput} autoFocus />
                  {
                    name === '' && isSubmitBtnPushed
                      ? <p className="form-review__warning">Заполните поле</p>
                      : <p className="form-review__warning"></p>
                  }
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse" onFocus={handleOnFocusStars} onBlur={handleOnBlurStars} tabIndex={0}>
                    {
                      starsValues.map((star, i) =>
                        (
                          <Fragment key={star.value}>
                            <input
                              className="visually-hidden"
                              id={`star-${star.value}`}
                              name="rate"
                              type="radio"
                              value={star.value}
                              ref={starInputRefs[i]}
                              onChange={handleStarsChange}
                              tabIndex={-1}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${star.value}`}
                              title={star.title}
                            >
                            </label>
                          </Fragment>
                        ),
                      )
                    }
                  </div>
                  {
                    rating === 0 && isSubmitBtnPushed
                      ? <p className="form-review__warning">Поставьте оценку</p>
                      : <p className="form-review__warning"></p>
                  }
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
              <input className="form-review__input" id="advantage" type="text" autoComplete="off" ref={advantageRef} onInput={handleAdvantageInput}/>
              {
                advantage === '' && isSubmitBtnPushed
                  ? <p className="form-review__warning">Заполните поле</p>
                  : <p className="form-review__warning"></p>
              }
              <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
              <input className="form-review__input" id="disadvantage" type="text" autoComplete="off" ref={disAdvantageRef} onInput={handleDisAdvantageInput}/>
              {
                disAdvantage === '' && isSubmitBtnPushed
                  ? <p className="form-review__warning">Заполните поле</p>
                  : <p className="form-review__warning"></p>
              }
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" ref={commentTextRef} onInput={handleCommentTextInput}></textarea>
              {
                commentText === '' && isSubmitBtnPushed
                  ? <p className="form-review__warning">Заполните поле</p>
                  : <p className="form-review__warning"></p>
              }
              <button className="button button--medium-20 form-review__button" type="submit">
                Отправить отзыв
              </button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={handleCloseModal}
              data-testid="button-cross"
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
