import {render, screen} from '@testing-library/react';
import ReviewForm from './review-form';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {createMockReview} from '../../utils/mock/comment-mock';
import {Provider} from 'react-redux';

describe('Component: ReviewForm', () => {
  const submitRegexp = /отправить отзыв/i;
  const guitarId = 1;
  const guitarName = 'guitar 1';
  const onSubmitCallback = jest.fn();
  const guitar = createMockGuitar();
  const comments = new Array(3)
    .fill('')
    .map(createMockReview)
    .map((review) => ({...review, createAt: review.createAt.toString()}));

  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.App]: {
      isLoadDataError: false,
    },
    [NameSpace.Product]: {
      guitar: guitar,
      comments: comments,
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <ReviewForm
        guitarId={guitarId}
        guitarName={guitarName}
        onSubmitCallback={onSubmitCallback}
      />
    </Provider>
  );

  it('should render correctly', () => {
    const formRegexp = /оставить отзыв/i;
    render(fakeApp);

    expect(screen.getByText(formRegexp)).toBeInTheDocument();
    expect(screen.getByText(guitarName)).toBeInTheDocument();
    expect(screen.getByText(submitRegexp)).toBeInTheDocument();
  });
});
