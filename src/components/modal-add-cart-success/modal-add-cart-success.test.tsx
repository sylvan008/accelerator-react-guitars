import {render, screen} from '@testing-library/react';
import ModalAddCartSuccess from './modal-add-cart-success';

describe('Component: ModalAddCartSuccess', () => {
  const onContinueClick = jest.fn();
  const onClose = jest.fn();

  const continueRegexp = /Продолжить покупки/i;
  const goToCartRegexp = /Перейти в корзину/i;

  it('should render correctly', () => {
    render(<ModalAddCartSuccess onContinueClick={onContinueClick} onClose={onClose} />);

    expect(screen.getByText(continueRegexp)).toBeInTheDocument();
    expect(screen.getByText(goToCartRegexp)).toBeInTheDocument();
  });
});
