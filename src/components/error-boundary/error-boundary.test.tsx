import {render, screen} from '@testing-library/react';
import ErrorBoundary from './error-boundary';

describe('Component: ErrorBoundary', () => {
  const errorRegexp = /сервер временно недоступен/i;
  const innerText = 'inner text';

  it('should show children components', () => {
    render(<ErrorBoundary><p>{innerText}</p></ErrorBoundary>);

    expect(screen.getByText(innerText)).toBeInTheDocument();
  });

  it('should show default message', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(errorRegexp)).toBeInTheDocument();
  });
});
