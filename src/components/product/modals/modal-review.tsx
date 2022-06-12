import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ActiveModal } from '../../../settings/active-modal';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import { getActiveModal } from '../../../store/selectors';
import ReviewForm from './review-form';
import ReviewSuccess from './review-success';

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

  return (
    <div>
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
  );
}

export default ModalReview;
