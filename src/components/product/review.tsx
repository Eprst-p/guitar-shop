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
    <div className="review" data-testid="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser" data-testid="user-name">{comment.userName}</h4>
        <span className="review__date" data-testid="review-date">{dateInFormat}</span>
      </div>
      <div className="rate review__rating-panel">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref={roundedRating>=1 ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref={roundedRating>=2 ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref={roundedRating>=3 ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref={roundedRating>=4 ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref={roundedRating>=5 ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
        <p className="visually-hidden">Оценка: {ratingNames[roundedRating]}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value" data-testid="advantage">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value" data-testid="disadvantage">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value" data-testid="comment">{comment.comment}</p>
    </div>
  );
}

export default Review;

