import {render, screen} from '@testing-library/react';
import ReviewPost from './review-post';
import {createMockReview} from '../../utils/mock/comment-mock';

describe('Component: ReviewPost', () => {
  it('should render correctly', () => {
    const comment = createMockReview();
    render(<ReviewPost comment={comment} />);
    expect(screen.getByText(comment.userName)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.rating)).toBeInTheDocument();
    expect(screen.getByText(comment.advantage)).toBeInTheDocument();
    expect(screen.getByText(comment.disadvantage)).toBeInTheDocument();
  });
});
