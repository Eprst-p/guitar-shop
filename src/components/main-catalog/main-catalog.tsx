/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchAllComments } from '../../store/api-actions';
import { getAllComments, getAllGuitars, getGuitarsForPage } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import CatalogSort from './catalog-sort';
import PagePagination from './page-pagination';
import ProductCard from './product-card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { changePage } from '../../store/interface-process/interface-process';

function MainCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const {pageNumber} = useParams();
  if (pageNumber) {
    dispatch(changePage(+pageNumber));
  }

  const allGuitars = useAppSelector(getAllGuitars);
  const guitarsForPage = useAppSelector(getGuitarsForPage);
  const allComments = useAppSelector(getAllComments);

  useEffect(() => {
    allGuitars.forEach((guitar) => dispatch(fetchAllComments(guitar.id)));
  }, [dispatch, allGuitars]);

  const findCommentsAmount = (guitarID:number) => {
    if (allComments.length === allGuitars.length) {
      const commentsPerGutar = allComments.find((commentsArray) => commentsArray[0]?.guitarId === guitarID) || [];
      return commentsPerGutar.length;
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Каталог</a>
          </li>
        </ul>
        <div className="catalog">
          <CatalogFilter />
          <CatalogSort />
          <div className="cards catalog__cards">
            {
              guitarsForPage.map((guitarCard) =>
                <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={findCommentsAmount(guitarCard.id) || 0} />,
              )
            }
          </div>
          <PagePagination />
        </div>
      </div>
    </main>
  );
}

export default MainCatalog;
