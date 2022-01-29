import {render, screen} from '@testing-library/react';
import ShoppingCart from './shopping-cart';

describe('Component: ShoppingCart', () => {
  it('should render correctly', () => {
    const labelRegexp = /корзина/i;
    render(<ShoppingCart />);

    expect(screen.getByLabelText(labelRegexp)).toBeInTheDocument();
  });
});
