import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ActiveModal } from '../../../settings/active-modal';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import { getActiveModal } from '../../../store/selectors';
import ReviewForm from './review-form';
import ReviewSuccess from './review-success';
import FocusTrap from 'focus-trap-react';
import { Options as FocusTrapOptions } from 'focus-trap';


function ModalReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(getActiveModal);
  const [activeTrap, setActiveTrap] = useState(false);
  const focusTrapOptions: FocusTrapOptions = {
    fallbackFocus: '.focus-trap-fallback',
  };

  const handleOnEscDown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        dispatch(changeActiveModal(ActiveModal.NoModal));
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnEscDown);
    return () => document.removeEventListener('keydown', handleOnEscDown);
  }, []);

  const body = document.querySelector('body');

  useEffect(() => {
    body?.setAttribute('style', 'overflow:hidden');
    if (activeModal !== ActiveModal.NoModal) {
      body?.setAttribute('style', 'overflow:hidden');
      setActiveTrap(true);
    }
    return () => body?.removeAttribute('style');
  }, [activeModal]);


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
      </div>
    </FocusTrap>
  );
}

export default ModalReview;
