/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAcousticFilter, getActiveModal, getElectricFilter, getFourStringsFilter, getGuitarsForPage, getMaxPriceFilter, getMinPriceFilter, getSevenStringsFilter, getSixStringsFilter, getSortOrder, getSortType, getTwelveStringsFilter, getUkuleleFilter } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import CatalogSort from './catalog-sort';
import PagePagination from './page-pagination';
import ProductCard from './product-card';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { changeActiveModal, changePage } from '../../store/interface-process/interface-process';
import { PageTitle } from '../../settings/page-title';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import { SortType } from '../../settings/sort-type';
import { fetchGuitarsWithQueryParams } from '../../store/api-actions';
import { SortOrder } from '../../settings/sort-order';
import { useEffect } from 'react';
import { ActiveModal } from '../../settings/active-modal';
import ModalReview from '../modals/modal-review';

function MainCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {pageNumber} = useParams();
  if (pageNumber) {
    dispatch(changePage(+pageNumber));
  }
  const activeModal = useAppSelector(getActiveModal);
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const acousticFilter = useAppSelector(getAcousticFilter);
  const electricFilter = useAppSelector(getElectricFilter);
  const ukuleleFilter = useAppSelector(getUkuleleFilter);
  const fourStringsFilter = useAppSelector(getFourStringsFilter);
  const sixStringsFilter = useAppSelector(getSixStringsFilter);
  const sevenStringsFilter = useAppSelector(getSevenStringsFilter);
  const twelveStringsFilter = useAppSelector(getTwelveStringsFilter);
  const minPriceFilter = useAppSelector(getMinPriceFilter);
  const maxPriceFilter = useAppSelector(getMaxPriceFilter);

  let queryParams = '';
  const queryParamsConstructor = () => {
    queryParams = '';
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
    if (acousticFilter) {
      queryParams += '&type=acoustic';
    }
    if (electricFilter) {
      queryParams += '&type=electric';
    }
    if (ukuleleFilter) {
      queryParams += '&type=ukulele';
    }
    if (fourStringsFilter) {
      queryParams += '&stringCount=4';
    }
    if (sixStringsFilter) {
      queryParams += '&stringCount=6';
    }
    if (sevenStringsFilter) {
      queryParams += '&stringCount=7';
    }
    if (twelveStringsFilter) {
      queryParams += '&stringCount=12';
    }
    if (minPriceFilter) {
      queryParams += `&price_gte=${minPriceFilter}`;
    }
    if (maxPriceFilter) {
      queryParams += `&price_lte=${maxPriceFilter}`;
    }
  };

  queryParamsConstructor();

  useEffect(() => {
    navigate(`${location.pathname}?${queryParams.slice(1)}`);
    dispatch(changeActiveModal(ActiveModal.NoModal));
    dispatch(fetchGuitarsWithQueryParams(queryParams));
  }, [dispatch, location.pathname, navigate, queryParams]);

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
            {
              activeModal !== ActiveModal.NoModal
                ?
                <ModalReview />
                :
                ''
            }
          </div>
          <PagePagination />
        </div>
      </div>
    </main>
  );
}

export default MainCatalog;
