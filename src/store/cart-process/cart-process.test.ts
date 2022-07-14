import { CartProcess } from '../../types/state';
import { makeItemInCart} from '../../mocks/data-mocks';
import { CouponStatus } from '../../settings/coupon-status';
import { addItemToCart, cartProcess, changeCouponName, changeCouponStatus, removeItemFromCart, setDicscount, setItemQuantity } from './cart-process';
import { ItemInCartType } from '../../types/item-in-cart-type';

const initialState: CartProcess = {
  guitarsIDiesInCart: [],
  discount: 0,
  itemsInCart: [],
  couponStatus: CouponStatus.Empty,
  couponName: null,
};

describe('Reducer: cart-process', () => {

  it('without additional parameters should return initial state', () => {
    expect(cartProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should push to guitarsIDies and itemsInCart when addItemToCart', () => {
    const itemInCart = makeItemInCart();
    const fakeGuitarsIDies = [itemInCart.id];
    const fakeItemsinCart = [itemInCart];
    expect(cartProcess.reducer(initialState, addItemToCart(itemInCart)))
      .toEqual({...initialState, guitarsIDiesInCart: fakeGuitarsIDies, itemsInCart: fakeItemsinCart});
  });

  it('should remove item from guitarsIDies and itemsInCart when removeItemFromCart', () => {
    const itemInCart = makeItemInCart();
    const fakeGuitarsIDies = [itemInCart.id];
    const fakeItemsinCart = [itemInCart];

    const anotherInitialState: CartProcess = {
      guitarsIDiesInCart: fakeGuitarsIDies,
      discount: 0,
      itemsInCart: fakeItemsinCart,
      couponStatus: CouponStatus.Empty,
      couponName: null,
    };

    expect(cartProcess.reducer(anotherInitialState, removeItemFromCart(itemInCart)))
      .toEqual({...anotherInitialState, guitarsIDiesInCart: [], itemsInCart: []});
  });

  it('should load discount to store', () => {
    const discount = 25;
    expect(cartProcess.reducer(initialState, setDicscount(discount)))
      .toEqual({...initialState, discount: discount});
  });

  it('should set item quantity', () => {
    const itemInCart = makeItemInCart();
    const fakeItemsinCart = [itemInCart];

    const anotherInitialState: CartProcess = {
      guitarsIDiesInCart: [],
      discount: 0,
      itemsInCart: fakeItemsinCart,
      couponStatus: CouponStatus.Empty,
      couponName: null,
    };

    const itemToChange:ItemInCartType = {
      id: itemInCart.id,
      quantity: 50,
    };

    expect(cartProcess.reducer(anotherInitialState, setItemQuantity(itemToChange)))
      .toEqual({...anotherInitialState, itemsInCart: [itemToChange]});
  });

  it('should change couponStatus to Correct', () => {
    expect(cartProcess.reducer(initialState, changeCouponStatus(CouponStatus.Correct)))
      .toEqual({...initialState, couponStatus: CouponStatus.Correct});
  });

  it('should change coupoName to "Volodya"', () => {
    expect(cartProcess.reducer(initialState, changeCouponName('Volodya')))
      .toEqual({...initialState, couponName: 'Volodya'});
  });

});
