import {createSlice} from '@reduxjs/toolkit';
import { CouponStatus } from '../../settings/coupon-status';
import {NameSpace} from '../../settings/name-space';
import {CartProcess} from '../../types/state';

const initialState: CartProcess = {
  guitarsIDiesInCart: [],
  discount: 0,
  itemsInCart: [],
  couponStatus: CouponStatus.Empty,
  couponName: null,
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addItemToCart: (state, {payload}) => {
      if (!state.guitarsIDiesInCart.includes(payload.id)) {
        state.guitarsIDiesInCart.push(payload.id);
        state.itemsInCart.push(payload);
      }
    },
    removeItemFromCart: (state, {payload}) => {
      if (state.guitarsIDiesInCart.includes(payload.id)) {
        const index = state.guitarsIDiesInCart.indexOf(payload.id);
        state.guitarsIDiesInCart.splice(index, 1);
        state.itemsInCart.splice(index, 1);
      }
    },
    setDicscount: (state, {payload}) => {state.discount = payload;},
    setItemQuantity: (state, {payload}) => {
      const currentItem = state.itemsInCart.find((item)=> item.id === payload.id);
      if (currentItem) {
        currentItem.quantity = payload.quantity;
      }
    },
    changeCouponStatus: (state, {payload}) => {state.couponStatus = payload;},
    changeCouponName: (state, {payload}) => {state.couponName = payload;},
  },
});

export const {addItemToCart, removeItemFromCart, setDicscount, setItemQuantity, changeCouponStatus, changeCouponName} = cartProcess.actions;
