import { useRef, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { AppRoute } from '../../settings/app-routes';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { fetchSearchedGuitars } from '../../store/api-actions';
import { loadSearchedGuitars } from '../../store/data-process/data-process';
import { getSearchedGuitars } from '../../store/selectors';

function SearchForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchField = useRef<HTMLInputElement>(null);
  const searchedGuitars = useAppSelector(getSearchedGuitars);
  const [isOpenedSelectList, setSelectListStatus] = useState(false);

  const handleSearchFieldOnInput = () => {
    if (searchField.current?.value !== '') {
      const searchParams = `&name_like=${searchField.current?.value}`;
      dispatch(fetchSearchedGuitars(searchParams));
      setSelectListStatus(true);
    }
    if (searchField.current?.value === '') {
      dispatch(loadSearchedGuitars([]));
      setSelectListStatus(false);
    }
  };

  const handleSearchFieldOnBlur = () => {
    if (searchField.current?.value === '') {
      dispatch(loadSearchedGuitars([]));
    }
    setSelectListStatus(false);
  };

  const handleSearchFieldOnFocus = () => {
    if (searchField.current?.value !== '') {
      setSelectListStatus(true);
    }
  };

  const handleOnCancelSearchBtnClick = () => {
    dispatch(loadSearchedGuitars([]));
    setSelectListStatus(false);
    if (searchField.current) {
      searchField.current.value = '';
    }
  };

  return (
    <div className="form-search"  data-testid="search-container">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onInput={handleSearchFieldOnInput}
          onBlur={handleSearchFieldOnBlur}
          onFocus={handleSearchFieldOnFocus}
          ref={searchField}
          data-testid="search-field"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${isOpenedSelectList ? 'list-opene' : 'hidden'}`} data-testid="search-item-list">
        {
          searchedGuitars.map((guitar) =>
            (
              <li className="form-search__select-item" tabIndex={1} key={guitar.id} data-testid="search-item">
                <Link
                  className="form-search__select-item"
                  tabIndex={0}
                  to={generatePath(AppRoute.Product, {id: `${guitar.id}${`#characteristics?articul=${guitar?.vendorCode}&type=${guitarTypeNames[guitar?.type || 'electric']}&stringCount=${guitar?.stringCount}`}`})}
                >
                  {guitar.name}
                </Link>
              </li>
            ),
          )
        }
      </ul>
      <button className="form-search__reset" type="reset" form="form-search" onClick={handleOnCancelSearchBtnClick} data-testid="cancel-btn">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
