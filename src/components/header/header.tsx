import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../settings/app-routes';
import SearchForm from './search-form';

function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className={`link main-nav__link ${location.pathname === AppRoute.Catalog ? 'link--current' : ''}`} to={AppRoute.Catalog} data-testid="nav-link-to-main">Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
