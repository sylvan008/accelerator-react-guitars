import {ChangeEvent, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {AxiosError} from 'axios';
import {ReviewPost} from '../../types/review';
import {ThunkAppDispatch} from '../../types/actionType';
import {postComment} from '../../store/api-action';
import {ActionName, FormProperty, useReviewFormState, ValueType} from '../../hooks/use-review-form-state';
import {useReviewValidationState, ValidationState} from '../../hooks/use-review-validation-state';
import RatingReviewForm from '../rating-review-form/rating-review-form';
import ReviewInput from '../review-input/review-input';
import ReviewTextarea from '../review-textarea/review-textarea';

type PropsType = {
  guitarId: number,
  guitarName: string,
  onSubmitCallback: () => void,
};

function ReviewForm(props: PropsType): JSX.Element {
  const {guitarId, guitarName, onSubmitCallback} = props;
  const [formState, formDispatch] = useReviewFormState();
  const [validationState, setValidationState] = useReviewValidationState(Object.keys(formState));

  const dispatch = useDispatch<ThunkAppDispatch>();

  const checkInputError = (value:ValueType) => !value;

  const catchErrorHandler = (formProperties: string[], messages: string[]) => {
    const errors: ValidationState = {};

    formProperties.forEach((formProperty) =>
      messages.forEach((message:string) => {
        if (message.includes(formProperty)) {
          errors[formProperty] = true;
        }
      }),
    );
    setValidationState((prevState) => ({
      ...prevState,
      ...errors,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData: ReviewPost = {
      ...formState,
      guitarId,
    };

    try {

      await dispatch(postComment(formData));
      onSubmitCallback();

    } catch (error: unknown) {
      const {response} = error as AxiosError;
      if (response?.status === 400) {
        const {messages} = response.data;
        catchErrorHandler(Object.keys(formState), messages);
      }
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const propertyName = event.target.name as ActionName;
    const value = propertyName === FormProperty.Rating ? Number(event.target.value) : event.target.value;

    formDispatch((oldState) => ({
      ...oldState,
      [propertyName]: value,
    }));
    setValidationState((oldState) => ({
      ...oldState,
      [propertyName]: checkInputError(value),
    }));
  };

  return (
    <>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
      <form
        className="form-review"
        onSubmit={onSubmit}
      >
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <ReviewInput
              label="Ваше Имя"
              id="user-name"
              className="form-review__input--name"
              name={FormProperty.UserName}
              value={formState.userName}
              isError={validationState[FormProperty.UserName]}
              onChange={onInputChange}
              isFocus
            />
          </div>

          <RatingReviewForm
            name={FormProperty.Rating}
            rating={formState.rating}
            isInvalid={validationState[FormProperty.Rating]}
            onChange={onInputChange}
          />
        </div>
        <ReviewInput
          label="Достоинства"
          id="advantage"
          value={formState.advantage}
          isError={validationState[FormProperty.Advantage]}
          name={FormProperty.Advantage}
          onChange={onInputChange}
        />
        <ReviewInput
          label="Недостатки"
          id="disadvantage"
          name={FormProperty.Disadvantage}
          value={formState.disadvantage}
          isError={validationState[FormProperty.Disadvantage]}
          onChange={onInputChange}
        />
        <ReviewTextarea
          label="Комментарий"
          id="comment"
          name={FormProperty.Comment}
          value={formState.comment}
          isError={validationState[FormProperty.Comment]}
          onChange={onInputChange}
        />
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </form>
    </>
  );
}

export default ReviewForm;
