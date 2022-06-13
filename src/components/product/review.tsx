import { ratingNames } from '../../settings/rating-names';
import { CommentType } from '../../types/comment-type';

type ReviewProps = {
  comment: CommentType;
}

function Review({comment}: ReviewProps): JSX.Element {
  const date = new Date(comment.createAt);

  type optionsType = {
    day: 'numeric';
    month: 'long';
  }
  const options :optionsType = {day: 'numeric', month: 'long'};
  const dateInFormat = new Intl.DateTimeFormat('ru-RU', options).format(date);

  const roundedRating = Math.round(comment.rating);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{dateInFormat}</span>
      </div>
      <div className="rate review__rating-panel">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>
        <p className="visually-hidden">Оценка: {ratingNames[roundedRating]}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default Review;

