import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { amountOfCommentsShown, scrollThresholdCoefficient } from '../../settings/constants';
import { changeActiveModal, pushToCommentsShown, startCommentsShown } from '../../store/interface-process/interface-process';
import { getActiveModal, getCommentsShown } from '../../store/selectors';
import { CommentsType } from '../../types/comment-type';
import Review from './review';
import { sortByNewerDate } from '../../settings/sort-commets';
import { HashLink as Link } from 'react-router-hash-link';
import ModalReview from '../modals/modal-review';
import { ActiveModal } from '../../settings/active-modal';
import throttle from 'lodash.throttle';


type ReviewsProps = {
  comments: CommentsType;
}

function Reviews({comments}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const commentsCopy = comments.slice();
  const sortedComments = commentsCopy.sort(sortByNewerDate);
  const [next, setNext] = useState(amountOfCommentsShown);
  const activeModal = useAppSelector(getActiveModal);
  const commentsShown = useAppSelector(getCommentsShown);
  const location = useLocation();

  const handleScrollDown = throttle(()=>{
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold  = height - screenHeight * scrollThresholdCoefficient;
    const currentPosition = scrolled + screenHeight;

    if (currentPosition >= threshold &&  commentsShown.length < comments.length) {
      updateShownComments(next, next + amountOfCommentsShown);
      setNext(next + amountOfCommentsShown);
    }
  }, 200);

  const updateShownComments = (start:number, end:number) => {
    for (let i=start; i<end; i++) {
      if (commentsShown.length < comments.length) {
        dispatch(pushToCommentsShown(sortedComments[i]));
      }
    }
  };

  //не хочется тут добавлять лишние депендесы, они мешают
  useEffect(() => {
    dispatch(startCommentsShown([]));
    updateShownComments(0, next);
  }, [comments]);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollDown);
    return () => document.removeEventListener('scroll', handleScrollDown);
  }, [comments, commentsShown, handleScrollDown, next]);

  const handleMoreBtnClick = () => {
    updateShownComments(next, next + amountOfCommentsShown);
    setNext(next + amountOfCommentsShown);
  };

  const handleAddReviewClick = () => {
    dispatch(changeActiveModal(ActiveModal.ReviewForm));
  };

  return (
    <section className="reviews" data-testid="reviews-container">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button
        className="button button--red-border button--big reviews__sumbit-button"
        onClick={handleAddReviewClick}
      >
        Оставить отзыв
      </button>
      {
        activeModal !== ActiveModal.NoModal
          ?
          <ModalReview />
          :
          ''
      }
      {
        commentsShown.map((comment) => (
          <Review comment={comment} key={comment.id} />
        ))
      }
      {
        comments.length <= commentsShown.length
          ?
          ''
          :
          <button
            className="button button--medium reviews__more-button"
            onClick={handleMoreBtnClick}
          >
            Показать еще отзывы
          </button>
      }
      <Link
        className="button button--up button--red-border button--big reviews__up-button"
        to={{
          pathname: `${location.pathname}${location.hash}`,
          hash: '#header',
        }}
      >
        Наверх
      </Link>
    </section>
  );
}

export default Reviews;
