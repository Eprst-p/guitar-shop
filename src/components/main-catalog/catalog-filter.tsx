import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { PriceField } from '../../settings/price-field';
import { StringsCount } from '../../settings/strings-count';
import { changeAcousticFilter, changeElectricFilter, changeFourStringsFilter, changeMaxPriceFilter, changeMinPriceFilter, changeSevenStringsFilter, changeSixStringsFilter, changeTwelveStringsFilter, changeUkuleleFilter, resetFilters} from '../../store/interface-process/interface-process';
import { getAcousticFilter, getElectricFilter, getFourStringsFilter, getMaxPrice, getMaxPriceFilter, getMinPrice, getMinPriceFilter, getSevenStringsFilter, getSixStringsFilter,getTwelveStringsFilter, getUkuleleFilter } from '../../store/selectors';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const urlAllTypesParams = searchParams.getAll('type');
  const urlAllStringCountParams = searchParams.getAll('stringCount');
  const urlMinPriceParams = searchParams.get('price_gte');
  const urlMaxPriceParams = searchParams.get('price_lte');

  const minPriceField = useRef<HTMLInputElement>(null);
  const maxPriceField = useRef<HTMLInputElement>(null);

  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  const acousticFilter = useAppSelector(getAcousticFilter);
  const electricFilter = useAppSelector(getElectricFilter);
  const ukuleleFilter = useAppSelector(getUkuleleFilter);
  const fourStringsFilter = useAppSelector(getFourStringsFilter);
  const sixStringsFilter = useAppSelector(getSixStringsFilter);
  const sevenStringsFilter = useAppSelector(getSevenStringsFilter);
  const twelveStringsFilter = useAppSelector(getTwelveStringsFilter);
  const minPriceFilter = useAppSelector(getMinPriceFilter);
  const maxPriceFilter = useAppSelector(getMaxPriceFilter);


  useEffect(() => {
    if (urlAllTypesParams.length !== 0 ) {
      if (urlAllTypesParams.includes('acoustic') && !acousticFilter) {
        dispatch(changeAcousticFilter());
      }
      if (urlAllTypesParams.includes('electric') && !electricFilter) {
        dispatch(changeElectricFilter());
      }
      if (urlAllTypesParams.includes('ukulele') && !ukuleleFilter) {
        dispatch(changeUkuleleFilter());
      }
    }

    if (urlAllStringCountParams.length !== 0 ) {
      if (urlAllStringCountParams.includes('4') && !fourStringsFilter) {
        dispatch(changeFourStringsFilter());
      }
      if (urlAllStringCountParams.includes('6') && !sixStringsFilter) {
        dispatch(changeSixStringsFilter());
      }
      if (urlAllStringCountParams.includes('7') && !sevenStringsFilter) {
        dispatch(changeSevenStringsFilter());
      }
      if (urlAllStringCountParams.includes('12') && !twelveStringsFilter) {
        dispatch(changeTwelveStringsFilter());
      }
    }

    if (urlMinPriceParams && !minPriceFilter) {
      dispatch(changeMinPriceFilter(+urlMinPriceParams));
    }

    if (urlMaxPriceParams && !maxPriceFilter) {
      dispatch(changeMaxPriceFilter(+urlMaxPriceParams));
    }
  }, [acousticFilter, dispatch, electricFilter, fourStringsFilter, maxPriceFilter, minPriceFilter, sevenStringsFilter, sixStringsFilter, twelveStringsFilter, ukuleleFilter, urlAllStringCountParams, urlAllTypesParams, urlMaxPriceParams, urlMinPriceParams]);


  const handleGuitarFilterChange = (guitarType: string) => {
    switch (guitarType) {
      case guitarTypeNames.acoustic:
        dispatch(changeAcousticFilter());
        break;
      case guitarTypeNames.electric:
        dispatch(changeElectricFilter());
        break;
      case guitarTypeNames.ukulele:
        dispatch(changeUkuleleFilter());
        break;
    }
  };

  const handleStringsFilterChange = (stringsCount: StringsCount) => {
    switch (stringsCount) {
      case StringsCount.Four:
        dispatch(changeFourStringsFilter());
        break;
      case StringsCount.Six:
        dispatch(changeSixStringsFilter());
        break;
      case StringsCount.Seven:
        dispatch(changeSevenStringsFilter());
        break;
      case StringsCount.Twelve:
        dispatch(changeTwelveStringsFilter());
        break;
    }
  };

  const handleClearBtnClick = () => {
    dispatch(resetFilters());
  };

  const handlePriceFieldBlur = (priceField:PriceField) => {
    if(minPriceField.current && maxPriceField.current) {
      switch (priceField) {
        case PriceField.Min:
          if (minPriceField.current.value === '') {
            dispatch(changeMinPriceFilter(undefined));
            break;
          }
          if (+minPriceField.current.value < minPrice) {
            minPriceField.current.value = `${minPrice}`;
          }
          if (+minPriceField.current.value > maxPrice) {
            minPriceField.current.value = `${maxPrice}`;
          }
          dispatch(changeMinPriceFilter(+minPriceField.current.value));
          break;
        case PriceField.Max:
          if (maxPriceField.current.value === '') {
            dispatch(changeMaxPriceFilter(undefined));
            break;
          }
          if (+maxPriceField.current.value > maxPrice) {
            maxPriceField.current.value = `${maxPrice}`;
          }
          if (+maxPriceField.current.value < minPrice) {
            maxPriceField.current.value = `${minPrice}`;
          }
          dispatch(changeMaxPriceFilter(+maxPriceField.current.value));
          break;
      }
    }
  };

  useEffect(() => {
    if (minPriceField.current && +minPriceField.current.value !== 0 && +minPriceField.current.value < minPrice) {
      minPriceField.current.value = `${minPrice}`;
    }
  }, [minPrice]);


  return (
    <form className="catalog-filter" data-testid="form-catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={`${minPrice}`}
              id="priceMin"
              name="от"
              onBlur={()=>handlePriceFieldBlur(PriceField.Min)}
              ref={minPriceField}
              data-testid="min-price"
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={`${maxPrice}`}
              id="priceMax"
              name="до"
              onBlur={()=>handlePriceFieldBlur(PriceField.Max)}
              ref={maxPriceField}
              data-testid="max-price"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={() => handleGuitarFilterChange(guitarTypeNames.acoustic)}
            checked={acousticFilter}
            disabled={fourStringsFilter && (!sixStringsFilter && !sevenStringsFilter && !twelveStringsFilter)}
            data-testid="acoustic"
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={() => handleGuitarFilterChange(guitarTypeNames.electric)}
            checked={electricFilter}
            disabled={twelveStringsFilter && (!sixStringsFilter && !sevenStringsFilter && !fourStringsFilter)}
            data-testid="electric"
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={() => handleGuitarFilterChange(guitarTypeNames.ukulele)}
            checked={ukuleleFilter}
            disabled={(sixStringsFilter || sevenStringsFilter || twelveStringsFilter) && !fourStringsFilter}
            data-testid="ukulele"
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onChange={() => handleStringsFilterChange(StringsCount.Four)}
            disabled={acousticFilter && (!ukuleleFilter && !electricFilter)}
            checked={fourStringsFilter}
            data-testid="4-strings"
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={() => handleStringsFilterChange(StringsCount.Six)}
            disabled={ukuleleFilter && (!acousticFilter && !electricFilter)}
            checked={sixStringsFilter}
            data-testid="6-strings"
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={() => handleStringsFilterChange(StringsCount.Seven)}
            disabled={ukuleleFilter && (!acousticFilter && !electricFilter)}
            checked={sevenStringsFilter}
            data-testid="7-strings"
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onChange={() => handleStringsFilterChange(StringsCount.Twelve)}
            disabled={(electricFilter || ukuleleFilter) && !acousticFilter}
            checked={twelveStringsFilter}
            data-testid="12-strings"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleClearBtnClick} data-testid="clear-btn">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
