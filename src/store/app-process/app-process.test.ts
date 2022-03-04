import {UNKNOWN_ACTION} from '../../utils/const/test-const';
import {AppState} from '../../types/store';
import {ActionType} from '../../types/actionType';
import {appProcess} from './app-process';

describe('Reducer: appProcess', () => {
  const initialState: AppState = {
    isLoadDataError: false,
  };

  it('without additional parameters should return initial State', () => {
    expect(appProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update IsLoadDataError', () => {
    const setLoadDataErrorAction = {
      type: ActionType.SetLoadDataError,
    };

    expect(appProcess(initialState, setLoadDataErrorAction))
      .toEqual({
        ...initialState,
        isLoadDataError: true,
      });
  });
});
