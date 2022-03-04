import {render, screen} from '@testing-library/react';
import Portal from './portal';
import {TestId} from '../../utils/const/test-id';

describe('Component: Portal', () => {
  const text = 'some text';

  it('should render correctly', () => {
    render(<Portal><p>{text}</p></Portal>);

    expect(screen.getByTestId(TestId.PortalContainer)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
