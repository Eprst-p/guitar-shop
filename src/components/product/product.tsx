/* eslint-disable no-console */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { ratingNames } from '../../settings/rating-names';
import { fetchCommentsByID, fetchGuitarByID } from '../../store/api-actions';
import { getCommentsByID, getGuitarByID} from '../../store/selectors';
import Reviews from './reviews';

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

  const guitarTypeKey = guitar?.type || 'electric';//костыльная защита от undefined
  const guitarRating = guitar?.rating || 1;//костыльная защита от undefined
  const roundedRating = Math.round(guitarRating);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">{guitar?.name}</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">{guitar?.name}</a>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src="img/content/catalog-product-2.jpg" srcSet="img/content/catalog-product-2@2x.jpg 2x" width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
            <div className="rate product-container__rating">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: {ratingNames[roundedRating]}</p>
            </div>
            <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{guitar?.vendorCode}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{guitarTypeNames[guitarTypeKey]}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{guitar?.stringCount} струнная</td>
                  </tr>
                </table>
                <p className="tabs__product-description hidden">{guitar?.description}</p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{guitar?.price}</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>
        <Reviews comments={comments} />
      </div>
    </main>
  );
}

export default Product;
