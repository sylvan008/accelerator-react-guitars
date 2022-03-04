import {render, screen} from '@testing-library/react';
import ModalWindow from './modal-window';

describe('Component: ModalWindow', () => {
  const onClose = jest.fn();

  const fakeApp = (
    <ModalWindow onClose={onClose}>
      <h1>Modal</h1>
    </ModalWindow>
  );

  it('should render correctly', () => {
    const modalWindowRegexp = /всплывающее окно/i;
    render(fakeApp);

    expect(screen.getByLabelText(modalWindowRegexp)).toBeInTheDocument();
  });

  it('should call close function', () => {
    const closeButtonRegexp = /закрыть/i;
    render(fakeApp);

    const closeButton = screen.getByLabelText(closeButtonRegexp);
    closeButton.click();
    expect(onClose).toBeCalledTimes(1);
  });
});
