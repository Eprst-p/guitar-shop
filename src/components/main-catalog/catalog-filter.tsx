import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { StringsCount } from '../../settings/strings-count';
import { changeAcousticFilter, changeElectricFilter, changeFourStringsFilter, changeSevenStringsFilter, changeSixStringsFilter, changeTwelveStringsFilter, changeUkuleleFilter, resetFilters} from '../../store/interface-process/interface-process';
import { getAcousticFilter, getElectricFilter, getFourStringsFilter, getSevenStringsFilter, getSixStringsFilter,getTwelveStringsFilter, getUkuleleFilter } from '../../store/selectors';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const acousticFilter = useAppSelector(getAcousticFilter);
  const electricFilter = useAppSelector(getElectricFilter);
  const ukuleleFilter = useAppSelector(getUkuleleFilter);
  const fourStringsFilter = useAppSelector(getFourStringsFilter);
  const sixStringsFilter = useAppSelector(getSixStringsFilter);
  const sevenStringsFilter = useAppSelector(getSevenStringsFilter);
  const twelveStringsFilter = useAppSelector(getTwelveStringsFilter);


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

  return (
    <form className="catalog-filter" data-testid="form-catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
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
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleClearBtnClick}>Очистить</button>
    </form>
  );
}

export default CatalogFilter;
