import { PageTitle } from '../../settings/page-title';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';

function Cart(): JSX.Element {

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">{PageTitle.Cart}</h1>
        <BreadCrumbs pageTittle={PageTitle.Cart} />
        <div className="cart" data-testid="cart">
          <div className="cart-item">
            <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
            </button>
            <div className="cart-item__image">
              <img src="img/content/catalog-product-2.jpg" srcSet="img/content/catalog-product-2@2x.jpg 2x" width="55" height="130" alt="ЭлектроГитара Честер bass" />
            </div>
            <div className="product-info cart-item__info">
              <p className="product-info__title">ЭлектроГитара Честер bass</p>
              <p className="product-info__info">Артикул: SO757575</p>
              <p className="product-info__info">Электрогитара, 6 струнная</p>
            </div>
            <div className="cart-item__price">17 500 ₽</div>
            <div className="quantity cart-item__quantity">
              <button className="quantity__button" aria-label="Уменьшить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
              <button className="quantity__button" aria-label="Увеличить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
            <div className="cart-item__price-total">17 500 ₽</div>
          </div>
          <div className="cart-item">
            <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
            </button>
            <div className="cart-item__image">
              <img src="img/content/catalog-product-4.jpg" srcSet="img/content/catalog-product-4@2x.jpg 2x" width="55" height="130" alt="СURT Z30 Plus"/>
            </div>
            <div className="product-info cart-item__info">
              <p className="product-info__title">СURT Z30 Plus</p>
              <p className="product-info__info">Артикул: SO754565</p>
              <p className="product-info__info">Электрогитара, 6 струнная</p>
            </div>
            <div className="cart-item__price">34 500 ₽</div>
            <div className="quantity cart-item__quantity">
              <button className="quantity__button" aria-label="Уменьшить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <input className="quantity__input" type="number" placeholder="1" id="4-count" name="4-count" max="99"/>
              <button className="quantity__button" aria-label="Увеличить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
            <div className="cart-item__price-total">34 500 ₽</div>
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
