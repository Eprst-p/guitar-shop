import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { SortOrder } from '../../settings/sort-order';
import { SortType } from '../../settings/sort-type';
import { changeSortOrder, changeSortType } from '../../store/interface-process/interface-process';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [chosenSortType, setChosenSortType] = useState<SortType | undefined>(undefined);
  const [chosenSortOrder, setChosenSortOrder] = useState<SortOrder | undefined>(undefined);
  const urlSortParams = searchParams.get('_sort');
  const urlOrderParams = searchParams.get('_order');

  useEffect(() => {
    if (urlSortParams && !chosenSortType) {
      switch (urlSortParams) {
        case 'price':
          setChosenSortType(SortType.Price);
          dispatch(changeSortType(SortType.Price));
          break;
        case 'rating':
          setChosenSortType(SortType.Rating);
          dispatch(changeSortType(SortType.Rating));
          break;
      }
    }
    if (urlOrderParams && !chosenSortOrder) {
      switch (urlOrderParams) {
        case 'asc':
          setChosenSortOrder(SortOrder.Asc);
          dispatch(changeSortOrder(SortOrder.Asc));
          break;
        case 'desc':
          setChosenSortOrder(SortOrder.Desc);
          dispatch(changeSortOrder(SortOrder.Desc));
          break;
      }
    }

  }, [chosenSortOrder, chosenSortType, dispatch, urlOrderParams, urlSortParams]);

  const handleSortTypeBtnClick = (priceType: SortType) => {
    switch (priceType) {
      case SortType.Price:
        setChosenSortType(SortType.Price);
        dispatch(changeSortType(SortType.Price));
        if (!chosenSortOrder) {
          setChosenSortOrder(SortOrder.Desc);
          dispatch(changeSortOrder(SortOrder.Desc));
        }
        break;
      case SortType.Rating:
        setChosenSortType(SortType.Rating);
        dispatch(changeSortType(SortType.Rating));
        if (!chosenSortOrder) {
          setChosenSortOrder(SortOrder.Desc);
          dispatch(changeSortOrder(SortOrder.Desc));
        }
        break;
    }
  };

  const handleSortOrderBtnCLick = (orderType: SortOrder) => {
    switch (orderType) {
      case SortOrder.Asc:
        setChosenSortOrder(SortOrder.Asc);
        dispatch(changeSortOrder(SortOrder.Asc));
        if (!chosenSortType) {
          setChosenSortType(SortType.Price);
          dispatch(changeSortType(SortType.Price));
        }
        break;
      case SortOrder.Desc:
        setChosenSortOrder(SortOrder.Desc);
        dispatch(changeSortOrder(SortOrder.Desc));
        if (!chosenSortType) {
          setChosenSortType(SortType.Price);
          dispatch(changeSortType(SortType.Price));
        }
        break;
    }
  };

  return (
    <div className="catalog-sort" data-testid="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`${chosenSortType === SortType.Price ? 'catalog-sort__type-button--active' :  ''} catalog-sort__type-button`}
          aria-label="по цене"
          onClick={() => handleSortTypeBtnClick(SortType.Price)}
          data-testid="sort-by-price"
        >
          по цене
        </button>
        <button
          className={`${chosenSortType === SortType.Rating ? 'catalog-sort__type-button--active' :  ''} catalog-sort__type-button`}
          aria-label="по популярности"
          onClick={() => handleSortTypeBtnClick(SortType.Rating)}
          data-testid="sort-by-rating"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`${chosenSortOrder === SortOrder.Asc ? 'catalog-sort__order-button--active' :  ''} catalog-sort__order-button catalog-sort__order-button--up`}
          aria-label="По возрастанию"
          onClick={() => handleSortOrderBtnCLick(SortOrder.Asc)}
          data-testid="sort-by-asc-order"
        >
        </button>
        <button
          className={`${chosenSortOrder === SortOrder.Desc ? 'catalog-sort__order-button--active' :  ''} catalog-sort__order-button catalog-sort__order-button--down`}
          aria-label="По убыванию"
          onClick={() => handleSortOrderBtnCLick(SortOrder.Desc)}
          data-testid="sort-by-desc-order"
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
