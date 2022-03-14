import {MessageType} from '../../utils/const/message';

type PropsType = {
  text: string,
  type: typeof MessageType[keyof typeof MessageType],
};

function InputMessage(props: PropsType): JSX.Element {
  const {text, type} = props;
  return (
    <p className={`form-input__message form-input__message--${type}`}>{text}</p>
  );
}

export default InputMessage;
