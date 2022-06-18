import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ratingNames } from '../../settings/rating-names';
import { fetchCommentsByID, fetchGuitarByID } from '../../store/api-actions';
import { getCommentsByID, getGuitarByID} from '../../store/selectors';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import Reviews from './reviews';
import Tabs from './tabs';

function Product(): JSX.Element {
  const {id} = useParams();
  const currentId = Number(id);
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(getGuitarByID);
  const comments = useAppSelector(getCommentsByID);

  useEffect(() => {
    if(guitar === undefined || guitar.id !== currentId) {
      dispatch(fetchGuitarByID(currentId));
      dispatch(fetchCommentsByID(currentId));
    }
  }, [currentId, dispatch, guitar, comments]);

  const roundedRating = Math.round(guitar?.rating || 1);
  const imgNumber = guitar?.previewImg.charAt(11);


  return (
    <main className="page-content">
      <div className="container" data-testid="product-container">
        <h1 className="page-content__title title title--bigger" data-testid="guitar-name">{guitar?.name}</h1>
        <BreadCrumbs pageTittle={guitar?.name} />
        <div className="product-container">
          <img className="product-container__img" src={`img/content/catalog-product-${imgNumber}.jpg`} srcSet={`img/content/catalog-product-${imgNumber}@2x.jpg 2x`} width="90" height="235" alt="" data-testid="guitar-img"/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
            <div className="rate product-container__rating">
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref={roundedRating>=1 ? '#icon-full-star' : '#icon-star'} data-testid="star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref={roundedRating>=2 ? '#icon-full-star' : '#icon-star'} data-testid="star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref={roundedRating>=3 ? '#icon-full-star' : '#icon-star'} data-testid="star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref={roundedRating>=4 ? '#icon-full-star' : '#icon-star'} data-testid="star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref={roundedRating>=5 ? '#icon-full-star' : '#icon-star'} data-testid="star"></use>
              </svg>
              <p className="visually-hidden">Оценка: {ratingNames[roundedRating]}</p>
              <p className="rate__count" data-testid="rate-count">{comments.length}</p>
            </div>
            <Tabs guitar={guitar} />
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value" data-testid="price">{guitar?.price}</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>
        <Reviews comments={comments} />
      </div>
    </main>
  );
}

export default Product;
