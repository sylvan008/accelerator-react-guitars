import {render, screen} from '@testing-library/react';
import ServerUnavailable from './server-unavailable';

describe('Component: ServerUnavailable', () => {
  it('should render correctly', () => {
    const titleRegexp = /сервер временно недоступен/i;
    render(<ServerUnavailable />);
    expect(screen.getByText(titleRegexp)).toBeInTheDocument();
  });
});
