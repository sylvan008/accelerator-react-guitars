import {ChangeEvent} from 'react';

type PropsType = {
  isChecked?: boolean,
  isDisabled?: boolean,
  label: string,
  name: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  value?: string,
};

function FilterCheckbox(props: PropsType): JSX.Element {
  const {
    isChecked = false,
    isDisabled = false,
    label,
    name,
    onChange,
    value = '',
  } = props;

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={name}
        name={name}
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default FilterCheckbox;
