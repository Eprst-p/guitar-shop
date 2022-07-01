import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getGuitarsForPage, getSortOrder, getSortType } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import CatalogSort from './catalog-sort';
import PagePagination from './page-pagination';
import ProductCard from './product-card';
import { useParams } from 'react-router-dom';
import { changePage } from '../../store/interface-process/interface-process';
import { PageTitle } from '../../settings/page-title';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import { SortType } from '../../settings/sort-type';
import { fetchGuitarsWithQueryParams } from '../../store/api-actions';
import { SortOrder } from '../../settings/sort-order';
import { useEffect } from 'react';

function MainCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const {pageNumber} = useParams();
  if (pageNumber) {
    dispatch(changePage(+pageNumber));
  }
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);

  let queryParams = '';
  const queryParamsConstructor = () => {
    if (sortType) {
      switch (sortType) {
        case SortType.Price:
          queryParams += '&_sort=price';
          break;
        case SortType.Rating:
          queryParams += '&_sort=rating';
          break;
      }
    }
    if (sortOrder && sortType) {
      switch (sortOrder) {
        case SortOrder.Asc:
          queryParams += '&_order=asc';
          break;
        case SortOrder.Desc:
          queryParams += '&_order=desc';
          break;
      }
    }
  };

  queryParamsConstructor();

  useEffect(() => {
    dispatch(fetchGuitarsWithQueryParams(queryParams));
  }, [dispatch, queryParams]);

  const guitarsForPage = useAppSelector(getGuitarsForPage);

  return (
    <main className="page-content">
      <div className="container" data-testid="main-container">
        <h1 className="page-content__title title title--bigger">{PageTitle.Catalog}</h1>
        <BreadCrumbs pageTittle={PageTitle.Catalog} />
        <div className="catalog">
          <CatalogFilter />
          <CatalogSort />
          <div className="cards catalog__cards">
            {
              guitarsForPage.map((guitarCard) =>
                <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />,
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
