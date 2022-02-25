import {useReducer} from 'react';

type ValidationState = {
  [x: string]: {
    [y: string]: boolean,
  },
};

type ValidationType = typeof ValidationAction[keyof typeof ValidationAction];

type ValidationActionType = {
  type: ValidationType,
  payload: boolean,
};

const ValidationAction = {
  Touched: 'touched',
  Error: 'error',
} as const;

function createValidationState(properties: string[]) {
  const validationState: ValidationState = {};
  Object.values(ValidationAction)
    .forEach((validationStateProp) => {
      const stateProperty: {[x: string]: boolean} = {};
      properties.forEach((property) => stateProperty[property] = false);
    });
  return validationState;
}

function validationReducer(state: ValidationState, action: ValidationActionType) {
  switch(action.type) {
    default:
      return state;
  }
}

function useReviewValidationState(properties: string[]) {
  const [validationState, validationDispatch] = useReducer(validationReducer, createValidationState(properties));

  return [validationState, validationDispatch];
}

export {
  useReviewValidationState
};
