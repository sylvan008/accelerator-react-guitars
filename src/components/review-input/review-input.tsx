import {ChangeEvent} from 'react';

type PropsType = {
  className?: string,
  id: string,
  isError: boolean,
  name?: string,
  label: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

function ReviewInput(props: PropsType): JSX.Element {
  const {
    className,
    id,
    isError,
    label,
    name,
    value,
    onChange,
  } = props;

  const classes = ['form-review__input', className ? className : ''].join(' ').trim();

  return (
    <>
      <label className="form-review__label form-review__label--required" htmlFor={id}>
        {label}
      </label>
      <input
        className={classes}
        id={id}
        type="text"
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
      />
      {isError && <span className="form-review__warning">Заполните поле</span>}
    </>
  );
}

export default ReviewInput;
