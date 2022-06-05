// import { useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
// import { changePage } from '../../store/interface-process/interface-process';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getGuitarsForPage } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import CatalogSort from './catalog-sort';
import PagePagination from './page-pagination';
import ProductCard from './product-card';

function MainCatalog(): JSX.Element {

  // const {pageNumber} = useParams();
  // const dispatch = useAppDispatch();

  // if (pageNumber) {
  //   dispatch(changePage(pageNumber));
  // }

  const guitarsForPage = useAppSelector(getGuitarsForPage);

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
                <ProductCard guitar={guitarCard} key={guitarCard.id} />,
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
