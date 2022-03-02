import {catalogProcess} from './catalog-process';
import {Catalog} from '../../types/store';
import {ActionType} from '../../types/actionType';
import {getMinMaxPriceValue} from '../../utils/utils';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {UNKNOWN_ACTION} from '../../utils/const/test-const';

describe('Reducer: catalogProcess', () => {
  let initialState: Catalog;

  beforeAll(() => {
    initialState = {
      guitars: [],
      guitar: null,
      priceBounds: [0, 0],
      isCatalogLoad: false,
    };
  });

  it('without additional parameters should return initial State', () => {
    expect(catalogProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update guitars', () => {
    const guitars = [
      createMockGuitar(),
      createMockGuitar(),
      createMockGuitar(),
    ];
    const guitarsAction = {
      type: ActionType.SetGuitars,
      payload: guitars,
    };

    expect(catalogProcess(initialState, guitarsAction))
      .toEqual({
        ...initialState,
        guitars,
      });
  });

  it('should update price bounds', () => {
    const guitars = [
      createMockGuitar(),
      createMockGuitar(),
    ];
    const priceBounds = getMinMaxPriceValue(guitars);
    const priceBoundsAction = {
      type: ActionType.SetPriceBounds,
      payload: priceBounds,
    };

    initialState.guitars = guitars;

    expect(catalogProcess(initialState, priceBoundsAction))
      .toEqual({
        ...initialState,
        priceBounds,
      });
  });

  it('should update isCatalogLoad', () => {
    const catalogLoadAction = {
      type: ActionType.SetCatalogLoad,
    };

    expect(catalogProcess(initialState, catalogLoadAction))
      .toEqual({
        ...initialState,
        isCatalogLoad: true,
      });
  });
});
