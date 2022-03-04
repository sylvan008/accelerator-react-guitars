import {render, screen} from '@testing-library/react';
import TabDescription from './tab-description';

describe('Component: TabDescription', () => {
  it('should render correctly', () => {
    const description = 'Описание';
    const label = 'description';
    render(<TabDescription label={label} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
