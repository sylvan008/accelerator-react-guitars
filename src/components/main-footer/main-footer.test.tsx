import {render, screen} from '@testing-library/react';
import MainFooter from './main-footer';
import {TestId} from '../../utils/const/test-id';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

describe('Component: MainFooter', () => {
  const history = createMemoryHistory();

  const fakeApp = (
    <Router history={history}>
      <MainFooter />
    </Router>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId(TestId.MainFooter)).toBeInTheDocument();
  });
});
