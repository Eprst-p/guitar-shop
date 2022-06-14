import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getGuitarsForPage } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import CatalogSort from './catalog-sort';
import PagePagination from './page-pagination';
import ProductCard from './product-card';
import { useParams } from 'react-router-dom';
import { changePage } from '../../store/interface-process/interface-process';
import { PageTitle } from '../../settings/page-title';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';

function MainCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const {pageNumber} = useParams();
  if (pageNumber) {
    dispatch(changePage(+pageNumber));
  }

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
