import {render, screen} from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(<Breadcrumbs />);

    const rootLink = screen.getAllByRole('link')[0];

    expect(rootLink).toBeInTheDocument();
  });
});
