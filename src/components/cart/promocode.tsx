import { FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { CouponStatus } from '../../settings/coupon-status';
import { couponPostAction } from '../../store/api-actions';
import { changeCouponStatus } from '../../store/cart-process/cart-process';
import { getCouponName, getCouponStatus } from '../../store/selectors';
import { CouponPostType } from '../../types/coupon-post-type';

function Promocode(): JSX.Element {
  const dispatch = useAppDispatch();
  const couponStatus = useAppSelector(getCouponStatus);
  const couponName = useAppSelector(getCouponName);
  const couponField = useRef<HTMLInputElement>(null);
  const input:HTMLInputElement | null = document.querySelector('#coupon');
  const regExp = new RegExp(/^[A-Za-zА-Яа-я0-9-w]*$/);

  const couponPostData:CouponPostType = {
    coupon: '',
  };

  const checkCouponValidity = (coupon: string) => {
    if (!regExp.test(`${coupon}`)) {
      input?.setCustomValidity('в промокоде не может быть пробелов');
    }
    if (regExp.test(`${coupon}`)) {
      input?.setCustomValidity('');
    }
  };

  useEffect(() => {
    if (couponName && couponField.current) {
      couponField.current.value = couponName;
    }
    if (couponStatus === CouponStatus.Error) {
      dispatch(changeCouponStatus(CouponStatus.Empty));
    }
  }, []);

  const handleAcceptPromoClick = () => {
    if (couponField.current) {
      checkCouponValidity(couponField.current.value);
    }
  };

  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (couponField.current && couponField.current.value !== '') {
      couponPostData.coupon = couponField.current.value;
      dispatch(couponPostAction(couponPostData));
    }
  };

  return (
    <div className="cart__coupon coupon" data-testid='coupon-container'>
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handleCouponSubmit}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" ref={couponField} data-testid='coupon-field'/>
          {
            couponStatus === CouponStatus.Correct
              ?
              <p className="form-input__message form-input__message--success" data-testid='message--success'>Промокод принят</p>
              :
              ''
          }
          {
            couponStatus === CouponStatus.Error
              ?
              <p className="form-input__message form-input__message--error" data-testid='message--error'>неверный промокод</p>
              :
              ''
          }
        </div>
        <button className="button button--big coupon__button" data-testid='coupon-btn' onClick={handleAcceptPromoClick}>Применить</button>
      </form>
    </div>
  );
}

export default Promocode;
