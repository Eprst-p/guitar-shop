import { Link } from 'react-router-dom';
import { useAppDispatch} from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { AppRoute } from '../../settings/app-routes';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import './cart-add-success.css';

function CartAddSuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
  };


  return (
    <div className="cart-add-success-container" data-testid="cart-add-success-container">
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <Link className="button button--small modal__button" to={AppRoute.Cart} onClick={handleCloseModal}>Перейти в корзину</Link>
              <Link className="button button--black-border button--small modal__button modal__button--right" to={AppRoute.Catalog} onClick={handleCloseModal}>Продолжить покупки</Link>
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

export default CartAddSuccess;
