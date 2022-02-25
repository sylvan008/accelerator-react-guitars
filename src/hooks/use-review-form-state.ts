import {useReducer} from 'react';

const ReviewAction = ({
  Advantage: 'advantage',
  Comment: 'comment',
  Disadvantage: 'disadvantage',
  Rating: 'rating',
  UserName: 'userName',
} as const);

const initialReviewState = {
  [ReviewAction.Advantage]: '',
  [ReviewAction.Comment]: '',
  [ReviewAction.Disadvantage]: '',
  [ReviewAction.Rating]: 0,
  [ReviewAction.UserName]: '',
};

type ValueState = typeof initialReviewState;

export type ActionName = typeof ReviewAction[keyof typeof ReviewAction];

export type ReviewActionType = {
  type: ActionName,
  payload: ValueState[keyof ValueState],
};

function reviewReducer(state: ValueState, action: ReviewActionType) {
  switch(action.type) {
    case ReviewAction.Advantage:
    case ReviewAction.Comment:
    case ReviewAction.Disadvantage:
    case ReviewAction.Rating:
    case ReviewAction.UserName:
      return ({
        ...state,
        [action.type]: action.payload,
      });
    default:
      return state;
  }
}

function useReviewFormState() {
  const [state, dispatchFormState] = useReducer(reviewReducer, initialReviewState);


  return [state, dispatchFormState];
}

export {
  ReviewAction,
  useReviewFormState
};
