import { useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { removeItemFromCart } from '../../store/cart-process/cart-process';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import { getGuitarByID} from '../../store/selectors';
import './cart-add-success.css';

function CartDelete(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(getGuitarByID);
  const imgNumber = guitar?.previewImg.charAt(11);

  const handleCloseModal = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
  };

  const handleDeleteFromCart = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
    dispatch(removeItemFromCart(guitar));
  };

  return (
    <div className="cart-delete-container" data-testid="cart-delete-container">
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={`img/content/catalog-product-${imgNumber}.jpg`} srcSet={`img/content/catalog-product-${imgNumber}@2x.jpg 2x`} width="67" height="137" alt={guitar?.name} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar?.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar?.vendorCode}</p>
                <p className="modal__product-params">{`${guitarTypeNames[guitar?.type || '']}, ${guitar?.stringCount} струнная`}</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar?.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={handleDeleteFromCart}>Удалить товар</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleCloseModal}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleCloseModal}>
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDelete;
