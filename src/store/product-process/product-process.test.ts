import {Product} from '../../types/store';
import {UNKNOWN_ACTION} from '../../utils/const/test-const';
import {productProcess} from './product-process';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {ActionType} from '../../types/actionType';
import {creatMockReview} from '../../utils/mock/comment-mock';

describe('Reducer: catalogProcess', () => {
  let initialState: Product;

  beforeEach(() => {
    initialState = {
      guitar: null,
      comments: [],
    };
  });

  it('should without additional parameters should return initial State', () => {
    expect(productProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update Guitar', () => {
    const guitar = createMockGuitar();
    const guitarAction = {
      type: ActionType.SetGuitar,
      payload: guitar,
    };

    expect(productProcess(initialState, guitarAction))
      .toEqual({
        ...initialState,
        guitar,
      });
  });

  it('should update Comments', () => {
    const comments = [
      creatMockReview(),
      creatMockReview(),
      creatMockReview(),
    ];

    const reviewAction = {
      type: ActionType.SetComments,
      payload: comments,
    };

    expect(productProcess(initialState, reviewAction))
      .toEqual({
        ...initialState,
        comments,
      });
  });
});
