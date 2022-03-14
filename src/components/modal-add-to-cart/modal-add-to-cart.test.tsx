import {render, screen} from '@testing-library/react';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import ModalAddToCart from './modal-add-to-cart';

describe('Component: ModalAddToCart', () => {
  const guitar = createMockGuitar();
  const onCartItemAdd = jest.fn();
  const onClose = jest.fn();

  const nameRegexp = new RegExp(guitar.name, 'i');
  const addToCartRegexp = /Добавить в корзину/i;

  it('should render correctly', () => {
    render(<ModalAddToCart guitar={guitar} onClose={onClose} onCartItemAdd={onCartItemAdd} />);

    expect(screen.getByText(nameRegexp)).toBeInTheDocument();
    expect(screen.getByText(addToCartRegexp)).toBeInTheDocument();
  });
});
