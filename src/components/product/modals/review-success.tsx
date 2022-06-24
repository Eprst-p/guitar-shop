import { useAppDispatch} from '../../../hooks/redux-hooks';
import { ActiveModal } from '../../../settings/active-modal';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import './review-success.css';

function ReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(changeActiveModal(ActiveModal.NoModal));
  };

  return (
    <div className="review-success-container" data-testid="review-success-container">
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} data-testid="overlay"></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={handleCloseModal}
                autoFocus
              >
                К покупкам!
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={handleCloseModal}
              data-testid="button-cross"
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSuccess;
