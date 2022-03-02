import {useState} from 'react';

export type ValidationState = Record<string, boolean>;

function createValidationState(properties: string[]) {
  const validationState: ValidationState = {};
  properties.forEach((property) => validationState[property] = false);
  return validationState;
}

function useReviewValidationState(properties: string[]): [state: ValidationState, dispatch:  React.Dispatch<React.SetStateAction<ValidationState>>] {
  const [validationState, setValidationState] = useState(createValidationState(properties));

  return [validationState, setValidationState];
}

export {
  useReviewValidationState
};
