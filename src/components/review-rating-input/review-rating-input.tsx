import {ChangeEvent} from 'react';

type PropsType = {
  isChecked: boolean,
  name: string,
  title: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

function ReviewRatingInput(props: PropsType): JSX.Element {
  const {
    isChecked,
    name,
    title,
    value,
    onChange,
  } = props;
  return (
    <>
      <input
        className="visually-hidden"
        type="radio"
        name={name}
        id={`star-${value}`}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <label
        className="rate__label"
        htmlFor={`star-${value}`}
        title={title}
      />
    </>
  );
}

export default ReviewRatingInput;
