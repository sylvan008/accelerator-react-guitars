import {render, screen} from '@testing-library/react';
import ModalMessage from './modal-message';

describe('Component: ModalMessage', () => {
  const text = 'message';
  const renderText = 'render';
  const renderComponent = () => (<p>{renderText}</p>);

  it('should render correctly', () => {
    render(<ModalMessage text={text} render={renderComponent} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(renderText)).toBeInTheDocument();
  });
});
