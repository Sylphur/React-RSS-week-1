import { Component, ErrorInfo, ReactNode } from 'react';
import { setLocalSearchParam } from '../../services/local-storage.service';

interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  fixApp() {
    setLocalSearchParam('Pikachu');
    location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <h1>Something gone wrong</h1>
          <button onClick={this.fixApp}>Fix it!</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;