import {render, screen} from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const loadingRegexp = /загрузка/i;

    render(<Loader />);

    expect(screen.getByText(loadingRegexp)).toBeInTheDocument();
  });
});
