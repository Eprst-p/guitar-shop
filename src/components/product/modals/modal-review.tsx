import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ActiveModal } from '../../../settings/active-modal';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import { getActiveModal } from '../../../store/selectors';
import ReviewForm from './review-form';
import ReviewSuccess from './review-success';
import FocusTrap from 'focus-trap-react';

function ModalReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(getActiveModal);

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
    }
    return () => body?.removeAttribute('style');
  }, [activeModal]);


  return (
    <FocusTrap>
      <div data-testid="modal-review">
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
