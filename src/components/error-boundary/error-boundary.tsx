import {Component, ErrorInfo, ReactNode} from 'react';

type Props = {
  children: ReactNode,
}

type State = {
  hasError: boolean,
  error: Error | null,
  errorInfo: ErrorInfo | null,
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
    });
  }

  public render() {
    if(this.state.hasError) {
      return (
        <section>
          <h1>Сервер временно недоступен</h1>
          <p>Пожалуйста, попробуйте позже.</p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
