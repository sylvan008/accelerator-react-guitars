import {render, screen} from '@testing-library/react';
import Reviews from './reviews';
import {createMockReview} from '../../utils/mock/comment-mock';
import {TestId} from '../../utils/const/test-id';

describe('Component: Reviews', () => {
  const showStep = 3;
  const guitarName = 'guitar 1';
  const guitarId = 1;
  const loadCommentsRegexp = /показать еще отзывы/i;

  const onCommentUpdate = jest.fn();

  it('should render correctly', () => {
    const comments = new Array(6).fill('').map(createMockReview);
    const reviewRegexp = /^отзывы$/i;
    render(
      <Reviews
        guitarName={guitarName}
        guitarId={guitarId}
        comments={comments}
        onCommentsUpdate={onCommentUpdate}
      />,
    );

    expect(screen.getByText(reviewRegexp)).toBeInTheDocument();
    expect(screen.getByText(loadCommentsRegexp)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestId.ReviewPost)).toHaveLength(showStep);
  });

  it('should load next comments', () => {
    const comments = new Array(6).fill('').map(createMockReview);
    render(
      <Reviews
        guitarName={guitarName}
        guitarId={guitarId}
        comments={comments}
        onCommentsUpdate={onCommentUpdate}
      />,
    );

    const loadCommentsButton = screen.getByText(loadCommentsRegexp);
    loadCommentsButton.click();
    expect(screen.getAllByTestId(TestId.ReviewPost)).toHaveLength(showStep * 2);
    expect(screen.queryByText(loadCommentsRegexp)).not.toBeInTheDocument();
  });
});
