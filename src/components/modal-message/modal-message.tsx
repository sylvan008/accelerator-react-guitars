type PropsType = {
  text: string,
  render: () => JSX.Element,
};

function ModalMessage(props: PropsType): JSX.Element {
  const {render, text} = props;
  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">{text}</p>
      {render()}
    </>
  );
}

export default ModalMessage;
