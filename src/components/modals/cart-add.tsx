import { useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { addItemToCart } from '../../store/cart-process/cart-process';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import { getGuitarByID } from '../../store/selectors';
import { ItemInCartType } from '../../types/item-in-cart-type';
import './cart-add.css';

function CartAdd(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(getGuitarByID);
  const imgNumber = guitar?.previewImg.charAt(11);

  const itemToCart:ItemInCartType = {
    id: 0,
    quantity: 1,
  };

  if (guitar) {
    itemToCart.id = guitar.id;
  }


  const handleCloseModal = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
  };

  const handleAddToCartClick = () => {
    dispatch(addItemToCart(itemToCart));
    dispatch(changeActiveModal(ActiveModal.CartAddSuccess));
  };


  return (
    <div className="cart-add-container" data-testid="cart-add-container">
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} data-testid="overlay"></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`img/content/catalog-product-${imgNumber}.jpg`} srcSet={`img/content/catalog-product-${imgNumber}@2x.jpg 2x`} width="67" height="137" alt={guitar?.name} data-testid="item-img"/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase" data-testid="item-name">Гитара {guitar?.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11" data-testid="item-vendor-code">Артикул: {guitar?.vendorCode}</p>
                <p className="modal__product-params" data-testid="item-string-count">{`${guitarTypeNames[guitar?.type || '']}, ${guitar?.stringCount} струнная`}</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price" data-testid="item-price">{guitar?.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddToCartClick} data-testid="add-btn">Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleCloseModal} data-testid="cross-btn">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAdd;
