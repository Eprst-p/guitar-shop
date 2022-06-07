/* eslint-disable no-console */
import { GuitarType } from '../../types/guitar-type';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { useState } from 'react';
import { GuitarTabs } from '../../settings/tabs';
import { Link} from 'react-router-dom';

type TabsProps = {
  guitar: GuitarType | undefined;
}

function Tabs({guitar}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(GuitarTabs.Characteristics);

  const handleTabClick = (tabType: GuitarTabs) => {
    setActiveTab(tabType);
  };


  return (
    <div className="tabs">
      <Link
        className={`button button--medium tabs__button ${activeTab === GuitarTabs.Characteristics ? '' : 'button--black-border'}`}
        to={`#characteristics?articul=${guitar?.vendorCode}&type=${guitarTypeNames[guitar?.type || 'electric']}&stringCount=${guitar?.stringCount}`}
        onClick={() => handleTabClick(GuitarTabs.Characteristics)}
      >
        Характеристики
      </Link>
      <Link
        className={`button button--medium tabs__button ${activeTab === GuitarTabs.Description ? '' : 'button--black-border'}`}
        to={`#description?description=${guitar?.description}`}
        onClick={() => handleTabClick(GuitarTabs.Description)}
      >
        Описание
      </Link>
      <div className="tabs__content" id="characteristics">
        <table className={`tabs__table ${activeTab === GuitarTabs.Characteristics ? '' : 'hidden'}`}>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{guitar?.vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{guitarTypeNames[guitarTypeKey]}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{guitar?.stringCount} струнная</td>
          </tr>
        </table>
        <p className={`tabs__product-description ${activeTab === GuitarTabs.Description ? '' : 'hidden'}`}>{guitar?.description}</p>
      </div>
    </div>
  );
}

export default Tabs;
