function CatalogSort(): JSX.Element {

  return (
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
  );
}

export default CatalogSort;
