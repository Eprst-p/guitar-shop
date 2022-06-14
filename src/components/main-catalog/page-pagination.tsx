import { generatePath, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { AppRoute } from '../../settings/app-routes';
import { cardsPerPage } from '../../settings/constants';
import { changePage } from '../../store/interface-process/interface-process';
import { getActivePage, getGuitarsWithComments } from '../../store/selectors';

function PagePagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const allGuitars = useAppSelector(getGuitarsWithComments);
  const activePage = useAppSelector(getActivePage);

  const pagesAmount = Math.ceil(allGuitars.length / cardsPerPage);
  const pagesNumbers = Array.from({length: pagesAmount}, (v, i) => i+1);

  const handlePageClick = (pageNumber: number) => {
    dispatch(changePage(pageNumber));
  };


  return (
    <div className="pagination page-content__pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {
          activePage > 1
            ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <Link
                className="link pagination__page-link"
                to={generatePath(AppRoute.CatalogPage, {pageNumber: `${+activePage - 1}`})}
                onClick={() => handlePageClick(+activePage - 1)}
              >
                Назад
              </Link>
            </li>
            :
            ''
        }
        {
          pagesNumbers.map((pageNumber) => (
            <li className={`pagination__page ${activePage === pageNumber ? 'pagination__page--active' : ''}`} key={pageNumber} data-testid="pagination-page-number">
              <Link
                className="link pagination__page-link"
                to={generatePath(AppRoute.CatalogPage, {pageNumber: `${pageNumber}`})}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </Link>
            </li>
          ))
        }
        {
          activePage < pagesAmount
            ?
            <li className="pagination__page pagination__page--next" id="next">
              <Link
                className="link pagination__page-link"
                to={generatePath(AppRoute.CatalogPage, {pageNumber: `${+activePage + 1}`})}
                onClick={() => handlePageClick(+activePage + 1)}
              >
                Далее
              </Link>
            </li>
            :
            ''
        }
      </ul>
    </div>
  );
}

export default PagePagination;
