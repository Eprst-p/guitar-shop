import { generatePath, Link} from 'react-router-dom';
import { AppRoute } from '../../settings/app-routes';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { ratingNames } from '../../settings/rating-names';
import {GuitarType} from '../../types/guitar-type';

type ProductCardProps = {
  guitar: GuitarType;
  commentsAmount: number;
}

function ProductCard({guitar, commentsAmount}: ProductCardProps): JSX.Element {

  const imgNumber = guitar.previewImg.charAt(11);
  const roundedRating = Math.round(guitar.rating);
  const hashUrl = `#characteristics?articul=${guitar?.vendorCode}&type=${guitarTypeNames[guitar?.type || 'electric']}&stringCount=${guitar?.stringCount}`;

  return (
    <div className="product-card">
      <img src={`img/content/catalog-product-${imgNumber}.jpg`} srcSet={`img/content/catalog-product-${imgNumber}@2x.jpg 2x`} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={roundedRating>=1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={roundedRating>=2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={roundedRating>=3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={roundedRating>=4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={roundedRating>=5 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {ratingNames[roundedRating]}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsAmount}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          className="button button--mini"
          to={generatePath(AppRoute.Product, {id: `${guitar.id}${hashUrl}`})}
        >
          Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
