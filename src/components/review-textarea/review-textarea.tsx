import {ChangeEvent} from 'react';

type PropsType = {
  className?: string,
  id: string,
  isError: boolean,
  label: string,
  name: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
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

  const classes = ['form-review__input', 'form-review__input--textarea', className ? className : ''].join(' ').trim();

  return (
    <>
      <label className="form-review__label form-review__label--required" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={classes}
        id={id}
        autoComplete="off"
        name={name}
        rows={10}
        value={value}
        onChange={onChange}
      />
      {isError && <span className="form-review__warning">Заполните поле</span>}
    </>
  );
}

export default ReviewInput;
