import {ChangeEvent, FormEvent, useState} from 'react';
import RatingReviewForm from '../rating-review-form/rating-review-form';
import {ReviewPost} from '../../types/review';
import {useDispatch} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actionType';
import {postComment} from '../../store/api-action';
import ReviewInput from '../review-input/review-input';
import ReviewTextarea from '../review-textarea/review-textarea';

type InputState = {
  value: string | number,
  isTouched: boolean,
};

type PropsType = {
  guitarId: number,
  guitarName: string,
};

function ReviewForm(props: PropsType): JSX.Element {
  const {guitarId, guitarName} = props;
  const [userName, setUserName] = useState({
    value: '',
    isTouched: false,
  });
  const [advantage, setAdvantage] = useState({
    value: '',
    isTouched: false,
  });
  const [disadvantage, setDisadvantage] = useState({
    value: '',
    isTouched: false,
  });
  const [comment, setComment] = useState({
    value: '',
    isTouched: false,
  });
  const [rating, setRating] = useState({
    value: 0,
    isTouched: false,
  });

  const dispatch = useDispatch<ThunkAppDispatch>();

  const checkInputError = ({value, isTouched}: InputState) => isTouched && !value;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setUserName((prevState) => ({
      ...prevState,
      isTouched: true,
    }));

    setRating((prevState) => ({
      ...prevState,
      isTouched: true,
    }));

    if (userName.value === '' || rating.value === 0) {
      return;
    }

    const formData: ReviewPost = {
      guitarId,
      userName: userName.value,
      advantage: advantage.value,
      disadvantage: disadvantage.value,
      comment: comment.value,
      rating: rating.value,
    };

    await dispatch(postComment(formData));
  };

  const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName({
      value: event.target.value,
      isTouched: true,
    });
  };
  const onRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating({
      value: Number(event.target.value),
      isTouched: true,
    });
  };
  const onAdvantageChange = (event: ChangeEvent<HTMLInputElement>) => setAdvantage({
    value: event.target.value,
    isTouched: true,
  });
  const onDisadvantageChange = (event: ChangeEvent<HTMLInputElement>) => setDisadvantage({
    value: event.target.value,
    isTouched: true,
  });
  const onCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setComment({
    value: event.target.value,
    isTouched: true,
  });

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
              value={userName.value}
              isError={checkInputError(userName)}
              onChange={onUserNameChange}
            />
          </div>

          <RatingReviewForm rating={rating.value} isInvalid={checkInputError(rating)} onChange={onRatingChange} />
        </div>
        <ReviewInput
          label="Достоинства"
          id="advantage"
          value={advantage.value}
          isError={checkInputError(advantage)}
          onChange={onAdvantageChange}
        />
        <ReviewInput
          label="Недостатки"
          id="disadvantage"
          value={disadvantage.value}
          isError={checkInputError(disadvantage)}
          onChange={onDisadvantageChange}
        />
        <ReviewTextarea
          label="Комментарий"
          id="comment"
          value={comment.value}
          isError={checkInputError(comment)}
          onChange={onCommentChange}
        />
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </form>
    </>
  );
}

export default ReviewForm;
