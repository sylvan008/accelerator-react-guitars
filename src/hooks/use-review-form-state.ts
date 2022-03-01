import {useState} from 'react';

const FormProperty = ({
  Advantage: 'advantage',
  Comment: 'comment',
  Disadvantage: 'disadvantage',
  Rating: 'rating',
  UserName: 'userName',
} as const);

const initialReviewState = {
  [FormProperty.Advantage]: '',
  [FormProperty.Comment]: '',
  [FormProperty.Disadvantage]: '',
  [FormProperty.Rating]: 0,
  [FormProperty.UserName]: '',
};

export type ValueState = typeof initialReviewState;

export type ActionName = typeof FormProperty[keyof typeof FormProperty];

export type ValueType = ValueState[keyof ValueState];

function useReviewFormState(): [state: ValueState, setState:  React.Dispatch<React.SetStateAction<ValueState>>] {
  const [formState, setFormState] = useState(initialReviewState);
  return [formState, setFormState];
}

export {
  FormProperty,
  useReviewFormState
};
