import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllGuitars } from '../../store/selectors';
import CatalogFilter from './catalog-filter';
import ProductCard from './product-card';

function MainCatalog(): JSX.Element {

  const allGuitars = useAppSelector(getAllGuitars);

  const firstNine = allGuitars.slice(0, 9);


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
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
              <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
            </div>
          </div>
          <div className="cards catalog__cards">
            {
              firstNine.map((guitarCard) =>
                <ProductCard guitar={guitarCard} key={guitarCard.id} />,
              )
            }
          </div>
          <div className="pagination page-content__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
              </li>
              <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainCatalog;
