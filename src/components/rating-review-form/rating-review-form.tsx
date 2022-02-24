import ReviewRatingInput from '../review-rating-input/review-rating-input';
import {ChangeEvent} from 'react';

const ratings = [
  {
    value: '5',
    title: 'Отлично',
  },
  {
    value: '4',
    title: 'Хорошо',
  },
  {
    value: '3',
    title: 'Нормально',
  },
  {
    value: '2',
    title: 'Плохо',
  },
  {
    value: '1',
    title: 'Ужасно',
  },
];

type PropsType = {
  rating: number,
  isInvalid: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

function RatingReviewForm(props: PropsType): JSX.Element {
  const {rating, isInvalid, onChange} = props;

  const isRatingChecked = (rate: number | string) => Number(rate) === rating;

  return (
    <div>
      <span className="form-review__label form-review__label--required">Ваша Оценка</span>
      <div className="rate rate--reverse">
        {ratings.map(({title, value}) => (
          <ReviewRatingInput
            key={`rating-${value}`}
            title={title}
            value={value}
            isChecked={isRatingChecked(value)}
            onChange={onChange}
          />
        ))}
        <span className="rate__count" />
        {isInvalid && <span className="rate__message">Поставьте оценку</span>}
      </div>
    </div>
  );
}

export default RatingReviewForm;
