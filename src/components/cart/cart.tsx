import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { PageTitle } from '../../settings/page-title';
import { orderPostAction } from '../../store/api-actions';
import { getActiveModal, getCouponName, getDiscount, getGuitarsInCart, getItemsInCart } from '../../store/selectors';
import { OrderPostType } from '../../types/order-post-type';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import ModalReview from '../modals/modal-review';
import CartItem from './cart-item';
import Promocode from './promocode';

function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarsInCart = useAppSelector(getGuitarsInCart);
  const itemsInCart = useAppSelector(getItemsInCart);
  const discount = useAppSelector(getDiscount);
  const activeModal = useAppSelector(getActiveModal);
  const couponName = useAppSelector(getCouponName);

  const createGuitarsIDsForPost = () => {
    const guitarsIDs:number[] = [];
    itemsInCart.forEach((item)=>{
      for (let i=0; i<item.quantity; i++) {
        guitarsIDs.push(item.id);
      }
    });
    return guitarsIDs;
  };

  const orderPostData:OrderPostType = {
    guitarsIds: createGuitarsIDsForPost(),
    coupon: couponName,
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    guitarsInCart.forEach((guitar)=>{
      const currentItem = itemsInCart.find((item) => item.id === guitar.id);
      if (currentItem) {
        totalPrice += guitar.price * +currentItem.quantity;
      }
    });
    return totalPrice;
  };

  const discountValue = calculateTotalPrice() * discount/100;
  const resultPrice = calculateTotalPrice() - discountValue;

  const handleOrderBtnClick = () => {
    dispatch(orderPostAction(orderPostData));
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">{PageTitle.Cart}</h1>
        <BreadCrumbs pageTittle={PageTitle.Cart} />
        <div className="cart" data-testid="cart-container">
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
            <Promocode />
            <div className="cart__total-info" data-testid='total-info'>
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:</span>
                <span className="cart__total-value" data-testid='total-value'>{calculateTotalPrice()} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">Скидка:</span>
                <span className={discount !== 0 ? 'cart__total-value cart__total-value--bonus' : 'cart__total-value cart__total-value'} data-testid='discount'>{discountValue !==0 ? `- ${discountValue} ₽` : '0 ₽'}</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment" data-testid='total-payment'>{resultPrice >= 0 ? resultPrice : 0} ₽</span>
              </p>
              <button className="button button--red button--big cart__order-button" onClick={handleOrderBtnClick}>Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
