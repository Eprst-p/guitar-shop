import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ActiveModal } from '../../settings/active-modal';
import { maxGiutarQuantity } from '../../settings/constants';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { setItemQuantity } from '../../store/cart-process/cart-process';
import { loadGuitarByID } from '../../store/data-process/data-process';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import { getItemsInCart } from '../../store/selectors';
import { GuitarWithCommentsType } from '../../types/guitar-with-comments-type';
import { ItemInCartType } from '../../types/item-in-cart-type';

type CartItemProps = {
  guitar: GuitarWithCommentsType;
}

function CartItem({guitar}: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const itemsInCart = useAppSelector(getItemsInCart);
  const currentItem = itemsInCart.find((item) => item.id === guitar?.id);
  const [quantity, setQuantity] = useState(currentItem?.quantity || '');
  const quantityField = useRef<HTMLInputElement>(null);
  const imgNumber = guitar.previewImg.charAt(11);

  const itemInCart:ItemInCartType = {
    id: guitar.id,
    quantity: quantity,
  };

  useEffect(() => {
    itemInCart.quantity = quantity;
    dispatch(setItemQuantity(itemInCart));

    return () => {
      dispatch(setItemQuantity(itemInCart));
    };
  }, [dispatch, quantity]);


  const handleMinusBtnClick = () => {
    if (quantity > 1) {
      setQuantity(+quantity - 1);
    }
    if (quantity <= 1) {
      dispatch(loadGuitarByID(guitar));
      dispatch(setItemQuantity(itemInCart));
      dispatch(changeActiveModal(ActiveModal.CartDelete));
    }
  };

  const handlePlusBtnClick = () => {
    if (quantity < maxGiutarQuantity) {
      setQuantity(+quantity + 1);
    }
  };

  const handleQuantityFieldOnInput = () => {
    if (quantityField.current) {
      if (+quantityField.current.value > maxGiutarQuantity) {
        quantityField.current.value = `${maxGiutarQuantity}`;
        setQuantity(maxGiutarQuantity);
      }
      else {
        setQuantity(quantityField.current.value);
      }
    }
  };

  const handleQuantityFieldOnBlur = () => {
    if (quantityField.current) {
      if (+quantityField.current.value < 1) {
        dispatch(loadGuitarByID(guitar));
        dispatch(setItemQuantity(itemInCart));
        dispatch(changeActiveModal(ActiveModal.CartDelete));
      }
    }
  };

  const handleCrossBtnClick = () => {
    dispatch(loadGuitarByID(guitar));
    dispatch(setItemQuantity(itemInCart));
    dispatch(changeActiveModal(ActiveModal.CartDelete));
  };

  return (
    <div className="cart-item" data-testid="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleCrossBtnClick} data-testid="cross-btn">
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={`img/content/catalog-product-${imgNumber}.jpg`} srcSet={`img/content/catalog-product-${imgNumber}@2x.jpg 2x`} width="55" height="130" alt={`${guitarTypeNames[guitar.type]} ${guitar.name}`} data-testid="item-img"/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title" data-testid="item-name">{`${guitarTypeNames[guitar.type]} ${guitar.name}`}</p>
        <p className="product-info__info" data-testid="item-vendor-code">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info" data-testid="item-string-count">{`${guitarTypeNames[guitar.type]}, ${guitar.stringCount} струнная`}</p>
      </div>
      <div className="cart-item__price" data-testid="item-price">{guitar.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleMinusBtnClick} data-testid="quantity-less">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={`${quantity}`} id="2-count" name="2-count" max={maxGiutarQuantity} min={0} value={quantity} ref={quantityField} onInput={handleQuantityFieldOnInput} onBlur={handleQuantityFieldOnBlur} data-testid="quantity-field"/>
        <button className="quantity__button" aria-label="Увеличить количество" onClick={handlePlusBtnClick} data-testid="quantity-more">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{+quantity * guitar.price}</div>
    </div>
  );
}

export default CartItem;
