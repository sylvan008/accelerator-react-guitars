import {ChangeEvent, useEffect, useRef} from 'react';

type PropsType = {
  className?: string,
  id: string,
  isError: boolean,
  isFocus?: boolean,
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
    isFocus = false,
    label,
    name,
    value,
    onChange,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const classes = ['form-review__input', className ? className : ''].join(' ').trim();

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [isFocus, inputRef]);

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
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
      {isError && <span className="form-review__warning">Заполните поле</span>}
    </>
  );
}

export default ReviewInput;
