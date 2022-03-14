import {render, screen} from '@testing-library/react';
import InputMessage from './input-message';
import {MessageType} from '../../utils/const/message';

describe('Component: InputMessage', () => {
  const messageType = MessageType.Success;
  const text = 'some text';

  it('should render correctly', () => {
    render(<InputMessage type={messageType} text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
