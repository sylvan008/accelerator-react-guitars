import {render, screen} from '@testing-library/react';
import ModalCartItemRemove from './modal-cart-item-remove';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: ModalCartItemRemove', () => {
  const guitar = createMockGuitar();
  const onConfirmRemove = jest.fn();
  const onClose = jest.fn();

  const nameRegexp = new RegExp(guitar.name, 'i');
  const removeRegexp = /Удалить товар/i;
  const continueRegexp = /Продолжить покупки/i;

  it('should render correctly', () => {
    render(<ModalCartItemRemove guitar={guitar} onConfirmRemove={onConfirmRemove} onClose={onClose} />);

    expect(screen.getByText(nameRegexp)).toBeInTheDocument();
    expect(screen.getByText(removeRegexp)).toBeInTheDocument();
    expect(screen.getByText(continueRegexp)).toBeInTheDocument();
  });
});
