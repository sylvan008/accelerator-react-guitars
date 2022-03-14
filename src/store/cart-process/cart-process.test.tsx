import * as faker from 'faker';
import {Cart} from '../../types/store';
import {UNKNOWN_ACTION} from '../../utils/const/test-const';
import {cartProcess} from './cart-process';
import {getRandomIntegerNumber} from '../../utils/mock/helpers';
import {ActionType} from '../../types/actionType';

describe('Reducer: CartProcess', () => {
  let initialState: Cart;

  beforeAll(() => {
    initialState = {
      items: [],
      discount: 0,
      appliedCoupon: '',
    };
  });

  it('should without additional parameters should return initial State', () => {
    expect(cartProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update item', () => {
    const item = getRandomIntegerNumber(1, 100);

    const guitarsAction = {
      type: ActionType.AddCartItem,
      payload: item,
    };

    expect(cartProcess(initialState, guitarsAction))
      .toEqual({
        ...initialState,
        items: [item],
      });
  });

  it('should update items', () => {
    const items = [
      getRandomIntegerNumber(1, 100),
      getRandomIntegerNumber(1, 100),
      getRandomIntegerNumber(1, 100),
      getRandomIntegerNumber(1, 100),
    ];

    const guitarsAction = {
      type: ActionType.AddCartItems,
      payload: items,
    };

    expect(cartProcess(initialState, guitarsAction))
      .toEqual({
        ...initialState,
        items,
      });
  });

  it('should update appliedCoupon', () => {
    const appliedCoupon = faker.lorem.word(10);

    const guitarsAction = {
      type: ActionType.AddAppliedCoupon,
      payload: appliedCoupon,
    };

    expect(cartProcess(initialState, guitarsAction))
      .toEqual({
        ...initialState,
        appliedCoupon,
      });
  });

  it('should update discount', () => {
    const discount = getRandomIntegerNumber(10, 50);

    const guitarsAction = {
      type: ActionType.AddDiscount,
      payload: discount,
    };

    expect(cartProcess(initialState, guitarsAction))
      .toEqual({
        ...initialState,
        discount,
      });
  });
});
