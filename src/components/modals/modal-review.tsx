import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import { getActiveModal } from '../../store/selectors';
import ReviewForm from './review-form';
import ReviewSuccess from './review-success';
import FocusTrap from 'focus-trap-react';
import { Options as FocusTrapOptions } from 'focus-trap';
import CartAdd from './cart-add';
import CartAddSuccess from './cart-add-success';
import CartDelete from './cart-delete';


function ModalReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(getActiveModal);
  const [activeTrap, setActiveTrap] = useState(false);
  const focusTrapOptions: FocusTrapOptions = {
    fallbackFocus: '.focus-trap-fallback',
  };

  const handleOnEscDown = useCallback(({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        dispatch(changeActiveModal(ActiveModal.NoModal));
        break;
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleOnEscDown);
    return () => document.removeEventListener('keydown', handleOnEscDown);
  }, [handleOnEscDown]);

  const body = document.querySelector('body');

  useEffect(() => {
    body?.setAttribute('style', 'overflow:hidden');
    if (activeModal !== ActiveModal.NoModal) {
      body?.setAttribute('style', 'overflow:hidden');
      setActiveTrap(true);
    }
    return () => body?.removeAttribute('style');
  }, [activeModal, body]);


  return (
    <FocusTrap active={activeTrap} focusTrapOptions={focusTrapOptions}>
      <div className="focus-trap-fallback">
        {
          activeModal === ActiveModal.ReviewForm
            ?
            <ReviewForm />
            :
            ''
        }
        {
          activeModal === ActiveModal.ReviewSuccess
            ?
            <ReviewSuccess />
            :
            ''
        }
        {
          activeModal === ActiveModal.CartAdd
            ?
            <CartAdd />
            :
            ''
        }
        {
          activeModal === ActiveModal.CartDelete
            ?
            <CartDelete />
            :
            ''
        }
        {
          activeModal === ActiveModal.CartAddSuccess
            ?
            <CartAddSuccess />
            :
            ''
        }
      </div>
    </FocusTrap>
  );
}

export default ModalReview;
