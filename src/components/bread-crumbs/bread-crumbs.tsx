import { Link } from 'react-router-dom';
import { AppRoute } from '../../settings/app-routes';
import { PageTitle } from '../../settings/page-title';

type BreadCrumbsProps = {
  pageTittle: string | undefined;
}

function BreadCrumbs({pageTittle}: BreadCrumbsProps): JSX.Element {

  return (
    <ul className="breadcrumbs page-content__breadcrumbs" data-testid="ul_breadcrumbs">
      <li className="breadcrumbs__item" data-testid="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Главная</Link>
      </li>
      <li className="breadcrumbs__item" data-testid="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
      </li>
      {
        pageTittle !== PageTitle.Catalog
          ?
          <li className="breadcrumbs__item" data-testid="breadcrumbs__item">
            <Link className="link" to={''} >{pageTittle}</Link>
          </li>
          :
          ''
      }
    </ul>
  );
}

export default BreadCrumbs;

