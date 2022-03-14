import {render, screen} from '@testing-library/react';
import CartItem from './cart-item';
import {getRandomIntegerNumber} from '../../utils/mock/helpers';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: CartItem', () => {
  const count = getRandomIntegerNumber(1, 99);
  const guitar = createMockGuitar();
  const onItemRemove = jest.fn();
  const onIncreaseQuantity = jest.fn();
  const onDecriesQuantity = jest.fn();
  const onItemsCountChange = jest.fn();

  const removeButtonRegexp = /удалить/i;
  const nameRegexp = new RegExp(`${guitar.name}`, 'i');

  it('should render correctly', () => {
    render(
      <CartItem
        count={count}
        guitar={guitar}
        onItemRemove={onItemRemove}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecriesQuantity={onDecriesQuantity}
        onItemsCountChange={onItemsCountChange}
      />,
    );

    expect(screen.getByText(nameRegexp)).toBeInTheDocument();
    expect(screen.getByLabelText(removeButtonRegexp)).toBeInTheDocument();
  });
});
