/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { amountOfCommentsShown } from '../../settings/constants';
import { pushToCommentsShown, startCommentsShown } from '../../store/interface-process/interface-process';
import { getCommentsShown } from '../../store/selectors';
import { CommentsType } from '../../types/comment-type';
import Review from './review';
import { sortByNewerDate } from './sort-commets';
import { HashLink as Link } from 'react-router-hash-link';

type ReviewsProps = {
  comments: CommentsType;
}

function Reviews({comments}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const commentsCopy = comments.slice();
  const sortedComments = commentsCopy.sort(sortByNewerDate);
  const [commentsToShow, setCommentsToShow] = useState<CommentsType>([]);
  const [next, setNext] = useState(amountOfCommentsShown);
  const commentsShown = useAppSelector(getCommentsShown);
  const location = useLocation();

  useEffect(() => {
    dispatch(startCommentsShown([]));
    updateShownComments(0, next);
  }, [comments]);

  const updateShownComments = (start:number, end:number) => {
    for (let i=start; i<end; i++) {
      if (commentsShown.length < comments.length) {
        dispatch(pushToCommentsShown(sortedComments[i]));
      }
    }
    setCommentsToShow(commentsShown);
  };


  console.log('comments:', comments);
  console.log('commentsShown:', commentsShown);
  console.log('commentsToShow:', commentsToShow);


  const handleMoreBtnClick = () => {
    updateShownComments(next, next + amountOfCommentsShown);
    setNext(next + amountOfCommentsShown);
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">
        Оставить отзыв
      </a>
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
