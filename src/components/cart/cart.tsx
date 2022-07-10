/* eslint-disable no-console */
import { useAppSelector } from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { PageTitle } from '../../settings/page-title';
import { getActiveModal, getDiscount, getGuitarsInCart, getItemsInCart } from '../../store/selectors';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import ModalReview from '../modals/modal-review';
import CartItem from './cart-item';

function Cart(): JSX.Element {
  const guitarsInCart = useAppSelector(getGuitarsInCart);
  const itemsInCart = useAppSelector(getItemsInCart);
  const discount = useAppSelector(getDiscount);
  const activeModal = useAppSelector(getActiveModal);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    guitarsInCart.forEach((guitar)=>{
      const currentItem = itemsInCart.find((item) => item.id === guitar.id);
      if (currentItem) {
        totalPrice += guitar.price * currentItem.quantity;
      }
    });
    return totalPrice;
  };

  const resultPrice = calculateTotalPrice() - discount;

  console.log(guitarsInCart);
  console.log('items:', itemsInCart);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">{PageTitle.Cart}</h1>
        <BreadCrumbs pageTittle={PageTitle.Cart} />
        <div className="cart" data-testid="cart">
          {
            guitarsInCart.map((guitar) =>
              <CartItem guitar={guitar} key={guitar.id} />,
            )
          }
          {
            activeModal !== ActiveModal.NoModal
              ?
              <ModalReview />
              :
              ''
          }
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
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:</span>
                <span className="cart__total-value">{calculateTotalPrice()} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">Скидка:</span>
                <span className={discount !== 0 ? 'cart__total-value cart__total-value--bonus' : 'cart__total-value cart__total-value'}>- {discount} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">{resultPrice >= 0 ? resultPrice : 0} ₽</span>
              </p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
